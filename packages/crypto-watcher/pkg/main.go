package main

import (
	"os"
	"os/signal"

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
			logrus.Infof("Received a new message: %v", msg)
		case <-interrupt:
			logrus.Info("Closing all websockets...")
			return
		}
	}
}
