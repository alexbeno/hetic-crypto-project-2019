package main

import (
	"os"
	"os/signal"
	"strconv"

	"github.com/sirupsen/logrus"
	kingpin "gopkg.in/alecthomas/kingpin.v2"
)

var (
	// Binance
	wsServerHost = kingpin.Flag("ws-server-host", "The host of the websocket server.").Required().String()

	// PSQL
	connectionString = kingpin.Flag("psql-connection-string", "The connection string to use to connect to PSQL.").Required().String()
)

func main() {
	kingpin.Parse()

	store, err := NewPSQLStore(*connectionString)
	if err != nil {
		panic(err)
	}

	currencies, err := store.ListCryptoCurrencies()
	if err != nil {
		panic(err)
	}

	binanceWS := NewBinanceWebSocketClient(*wsServerHost)

	for _, currency := range currencies {
		logrus.Infof("Started watching currency %s", currency.Symbol)
		if currency.Stared {
			if err := binanceWS.SubscribeToTickerChannel(currency.Symbol); err != nil {
				panic(err)
			}
		}
	}

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)

	for {
		select {
		case msg := <-binanceWS.TickerMessagesChan:
			logrus.Infof("Received a new pricing update for currency %s: %s", msg.Symbol, msg.LastPrice)
			currency, err := store.GetCryptoCurrencyFromSymbol(msg.Symbol)
			if err != nil {
				logrus.Errorf("an error occured while getting the currency from its symbol: %v", err)
				continue
			}

			value, err := strconv.ParseFloat(msg.LastPrice, 32)
			if err != nil {
				logrus.Errorf("unsable to parse float from string: %v", err)
				continue
			}

			if err := store.AddCryptoCurrencyValue(CryptoCurrencyValue{
				Value:    value,
				CryptoID: currency.ID,
			}); err != nil {
				logrus.Errorf("an error occured while adding the currency value: %v", err)
				continue
			}
		case <-interrupt:
			if err := binanceWS.Close(); err != nil {
				panic(err)
			}
			return
		}
	}
}
