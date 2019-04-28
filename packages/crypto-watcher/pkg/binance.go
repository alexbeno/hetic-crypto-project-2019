package main

import (
	"encoding/json"
	"net/url"
	"strings"

	"github.com/gorilla/websocket"
	"github.com/sirupsen/logrus"
)

// TickerSubscriptionChannel refers to the name of the channel to subscribe to for ticker updates
const TickerSubscriptionChannel = "ticker"

// TickerMessagePayload describes the payload of a ticker message
type TickerMessagePayload struct {
	EventType                       string `json:"e"`
	EventTime                       int    `json:"E"`
	Symbol                          string `json:"s"`
	PriceChange                     string `json:"p"`
	PriceChangePercent              string `json:"P"`
	WeightedAveragePrice            string `json:"w"`
	FirstTradePriceForRollingWindow string `json:"x"`
	LastPrice                       string `json:"c"`
	LastQuantity                    string `json:"Q"`
	BestBidPrice                    string `json:"b"`
	BestBidQuantity                 string `json:"B"`
	BestAskPrice                    string `json:"a"`
	BestAskQuantity                 string `json:"A"`
	OpenPrice                       string `json:"o"`
	HighPrice                       string `json:"h"`
	LowPrice                        string `json:"l"`
	TotalTradedBaseAssetVolume      string `json:"v"`
	TotalTradedQuoteAssetVolume     string `json:"q"`
	StatisticsOpenTime              int    `json:"O"`
	StatisticsCloseTime             int    `json:"C"`
	FirstTradeID                    int    `json:"F"`
	LastTradeID                     int    `json:"L"`
	TotalNumberOfTrades             int    `json:"n"`
}

// BinanceWebSocketClient defines the structure of a ws client for Binance with required attributes
type BinanceWebSocketClient struct {
	ServerHost string

	Conns map[*websocket.Conn]struct{}

	TickerMessagesChan chan TickerMessagePayload
}

// NewBinanceWebSocketClient instantiates a new ws binance client
func NewBinanceWebSocketClient(host string) *BinanceWebSocketClient {
	return &BinanceWebSocketClient{
		ServerHost:         host,
		Conns:              make(map[*websocket.Conn]struct{}),
		TickerMessagesChan: make(chan TickerMessagePayload),
	}
}

// SubscribeToTickerChannel subscribes a binance ws client to a ticker channel for a given currency
func (c *BinanceWebSocketClient) SubscribeToTickerChannel(currency string) error {
	u := url.URL{Scheme: "wss", Host: c.ServerHost, Path: "/ws/" + strings.ToLower(currency) + "@" + TickerSubscriptionChannel}

	conn, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		return err
	}

	c.Conns[conn] = struct{}{}

	conn.SetPingHandler(func(appData string) error {
		if err := conn.WriteMessage(websocket.PongMessage, []byte{}); err != nil {
			return err
		}

		return nil
	})

	go func() {
		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				if websocket.IsCloseError(err) {
					if err := c.SubscribeToTickerChannel(currency); err != nil {
						logrus.Errorf("an error occured while reconnecting to channel: %v", err)
					}
					return
				}
				logrus.Errorf("an error occured while reading messages from connection: %v", err)
			}

			var tickerMessage TickerMessagePayload
			if err := json.Unmarshal(message, &tickerMessage); err != nil {
				logrus.Errorf("an error occured while unmarshalling message: %v", err)
			}

			c.TickerMessagesChan <- tickerMessage
		}
	}()

	return nil
}

// Close closes all the opened connections for the binance ws client
func (c *BinanceWebSocketClient) Close() error {
	for conn := range c.Conns {
		if err := conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "")); err != nil {
			return err
		}
		delete(c.Conns, conn)
	}

	return nil
}
