DROP DATABASE IF EXISTS hetic;
CREATE DATABASE hetic;
\connect hetic
CREATE TABLE "crypto" (
  "id"      serial PRIMARY KEY,
  "symbol"  varchar(10) NOT NULL,
  "name"    text
);
CREATE TABLE "values" (
  "id"        serial PRIMARY KEY,
  "cryptoId"  serial REFERENCES crypto(id),
  "date"      date NOT NULL DEFAULT now(),
  "value"     float NOT NULL
);
INSERT INTO "crypto" ("id", "symbol", "name") VALUES (1, 'BTC', 'Bitcoin');
INSERT INTO "values" ("id", "cryptoId", "date", "value") VALUES (1, 1, '2019-04-22', 10000000.03);
