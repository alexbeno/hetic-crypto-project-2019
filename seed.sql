DROP DATABASE IF EXISTS hetic;
CREATE DATABASE hetic;
\connect hetic
CREATE TABLE "crypto" (
  "id"      serial PRIMARY KEY,
  "symbol"  varchar(10) NOT NULL,
  "name"    text,
  "stared"  boolean DEFAULT 'false'
);
CREATE TABLE "values" (
  "id"        serial PRIMARY KEY,
  "crypto_id"  serial REFERENCES crypto(id),
  "date"      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "value"     float NOT NULL
);
INSERT INTO "crypto" ("id", "symbol", "name", "stared") VALUES (1, 'BTCUSDT', 'BitcoinTetherUSD', true);
