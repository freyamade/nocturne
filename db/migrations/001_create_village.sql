-- +migrate up
CREATE TABLE villages (
  id             SERIAL    PRIMARY KEY,
  name           VARCHAR   NOT NULL,
  created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMP
);

CREATE INDEX villages_name ON villages (name);

-- +migrate down
DROP TABLE IF EXISTS villages;
