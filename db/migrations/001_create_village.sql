-- +migrate up
CREATE TABLE villages (
  id             SERIAL    PRIMARY KEY,
  name           VARCHAR   NOT NULL
);

CREATE INDEX villages_name ON villages (name);

-- +migrate down
DROP TABLE IF EXISTS villages;
