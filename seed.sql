DROP DATABASE IF EXISTS hetic;
CREATE DATABASE hetic;
\connect hetic
CREATE TABLE "crypto" (
  "id"      serial PRIMARY KEY,
  "symbol"  varchar(10) NOT NULL,
  "name"    text,
  "starred"  boolean DEFAULT 'false'
);
CREATE TABLE "values" (
  "id"        serial PRIMARY KEY,
  "cryptoId"  serial REFERENCES crypto(id),
  "date"      date NOT NULL DEFAULT now(),
  "value"     float NOT NULL
);
INSERT INTO "crypto" ("id", "symbol", "name", "starred") VALUES
  (1, 'BTC', 'Bitcoin', false),
  (2, 'ETH', 'Ethereum', true),
  (3, 'EOS', 'EOS', false),
  (4, 'LTC', 'Litecoin', false),
  (5, 'XRP', 'XRP', false),
  (6, 'BCH', 'Bitcoin Cash', true),
  (7, 'ZB', 'ZeroBank', false);
INSERT INTO "values" ("id", "cryptoId", "date", "value") VALUES
  (1, 1, '2019-04-19', 10000000.03),
  (2, 1, '2019-04-20', 12000.01),
  (3, 1, '2019-04-22', 900000.11),
  (4, 1, '2019-04-24', 2201.21),
  (5, 1, '2019-05-01', 123456.12),
  (6, 1, '2019-05-02', 234567.56),
  (7, 1, '2019-05-20', 3456789.98),
  (8, 1, '2019-08-01', 4567899.00);
