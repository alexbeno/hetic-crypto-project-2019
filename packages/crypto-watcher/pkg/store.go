package main

import (
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

// CryptoCurrency describes the structure of a crypto currency in our database model
type CryptoCurrency struct {
	ID     int    `db:"id"`
	Symbol string `db:"symbol"`
	Name   string `db:"name"`
	Stared bool   `db:"stared"`
}

// CryptoCurrencyValue describes the structure of a crypto currency value in our database model
type CryptoCurrencyValue struct {
	ID       int       `db:"id"`
	CryptoID int       `db:"crypto_id"`
	Date     time.Time `db:"date"`
	Value    float64   `db:"value"`
}

// Store defines the interface that should be implemented by any store
type Store interface {
	GetCryptoCurrencyFromSymbol(symbol string) (*CryptoCurrency, error)
	ListCryptoCurrencies() ([]CryptoCurrency, error)

	AddCryptoCurrencyValue(value CryptoCurrencyValue) error
}

// PSQLStore implements the store interface for PostgreSQL
type PSQLStore struct {
	Store

	db *sqlx.DB
}

// NewPSQLStore instantiates a new PSQLStore from a given connection string and connect to db
func NewPSQLStore(connectionString string) (*PSQLStore, error) {
	db, err := sqlx.Connect("postgres", connectionString)
	if err != nil {
		return nil, err
	}

	return &PSQLStore{
		db: db,
	}, nil
}

// GetCryptoCurrencyFromSymbol gets a crypto currency from its symbol
func (s *PSQLStore) GetCryptoCurrencyFromSymbol(symbol string) (*CryptoCurrency, error) {
	currency := &CryptoCurrency{}
	if err := s.db.Get(currency, "SELECT * FROM crypto WHERE symbol = $1", symbol); err != nil {
		return nil, err
	}

	return currency, nil
}

// ListCryptoCurrencies lists all the available crypto currency
func (s *PSQLStore) ListCryptoCurrencies() ([]CryptoCurrency, error) {
	currencies := []CryptoCurrency{}
	if err := s.db.Select(&currencies, "SELECT * FROM crypto"); err != nil {
		return nil, err
	}

	return currencies, nil
}

// AddCryptoCurrencyValue adds a new crypto currency value
func (s *PSQLStore) AddCryptoCurrencyValue(value CryptoCurrencyValue) error {
	if _, err := s.db.NamedExec(
		"INSERT INTO values (crypto_id, value) VALUES (:crypto_id, :value)",
		value,
	); err != nil {
		return err
	}

	return nil
}
