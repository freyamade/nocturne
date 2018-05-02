-- +micrate Up
-- SQL in section 'Up' is executed when this migration is applied
ALTER TABLE users
    ADD COLUMN player BOOL DEFAULT false;
-- +micrate Down
-- SQL section 'Down' is executed when this migration is rolled back
ALTER TABLE users
    DROP COLUMN player;
