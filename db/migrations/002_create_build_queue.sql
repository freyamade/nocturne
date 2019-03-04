-- +migrate up
CREATE TABLE build_queues (
  id             SERIAL    PRIMARY KEY,
  village_id     INT       NOT NULL    REFERENCES villages(id),

  UNIQUE (village_id)
);

-- +migrate down
DROP TABLE IF EXISTS build_queues;
