-- +micrate Up
CREATE TABLE resource_stores(
  id BIGSERIAL PRIMARY KEY,
  village_id BIGINT,
  resource_id BIGINT,
  count BIGINT
);
CREATE INDEX "resource_stores_village_idx" ON resource_stores (village_id);
CREATE INDEX "resource_stores_resource_idx" ON resource_stores (resource_id);

CREATE TABLE building_resources(
  id BIGSERIAL PRIMARY KEY,
  building_id BIGINT,
  resource_id BIGINT,
  count BIGINT
);
CREATE INDEX "building_resources_building_idx" ON building_resources (building_id);
CREATE INDEX "building_resources_resource_idx" ON building_resources (resource_id);

CREATE TABLE village_buildings(
  id BIGSERIAL PRIMARY KEY,
  village_id BIGINT,
  building_id BIGINT,
  count BIGINT
);
CREATE INDEX "village_buildings_village_idx" ON village_buildings (village_id);
CREATE INDEX "village_buildings_building_idx" ON village_buildings (building_id);

CREATE TABLE building_furnishings(
  id BIGSERIAL PRIMARY KEY,
  building_id BIGINT,
  furnishing_id BIGINT,
  count BIGINT
);
CREATE INDEX "building_furnishings_building_idx" ON building_furnishings (building_id);
CREATE INDEX "building_furnishings_furnishing_idx" ON building_furnishings (furnishing_id);

CREATE TABLE required_crafters(
  id BIGSERIAL PRIMARY KEY,
  building_id BIGINT,
  crafter_id BIGINT
);
CREATE INDEX "required_crafters_building_idx" ON required_crafters (building_id);
CREATE INDEX "required_crafters_crafter_idx" ON required_crafters (crafter_id);

CREATE TABLE residing_crafters(
  id BIGSERIAL PRIMARY KEY,
  village_id BIGINT,
  crafter_id BIGINT,
  name VARCHAR
);
CREATE INDEX "residing_crafters_village_idx" ON residing_crafters (village_id);
CREATE INDEX "residing_crafters_crafter_idx" ON residing_crafters (crafter_id);

CREATE TABLE build_queue_buildings(
  id BIGSERIAL PRIMARY KEY,
  build_queue_id BIGINT,
  building_id BIGINT,
  time_already_spent BIGINT
);
CREATE INDEX "build_queue_buildings_build_queue_idx" ON build_queue_buildings (build_queue_id);
CREATE INDEX "build_queue_buildings_building_idx" ON build_queue_buildings (building_id);

-- +micrate Down
-- SQL section 'Down' is executed when this migration is rolled back
-- DROP INDEX calls
DROP INDEX "resource_stores_village_idx";
DROP INDEX "resource_stores_resource_idx";
DROP INDEX "building_resources_building_idx";
DROP INDEX "building_resources_resource_idx";
DROP INDEX "village_buildings_village_idx";
DROP INDEX "village_buildings_building_idx";
DROP INDEX "building_furnishings_building_idx";
DROP INDEX "building_furnishings_furnishing_idx";
DROP INDEX "required_crafters_building_idx";
DROP INDEX "required_crafters_crafter_idx";
DROP INDEX "residing_crafters_village_idx";
DROP INDEX "residing_crafters_crafter_idx";
DROP INDEX "build_queue_buildings_build_queue_idx";
DROP INDEX "build_queue_buildings_building_idx";

-- DROP TABLE calls
DROP TABLE resources_store;
DROP TABLE building_resources;
DROP TABLE village_buildings;
DROP TABLE building_furnishings;
DROP TABLE required_crafters;
DROP TABLE residing_crafters;
DROP TABLE build_queue_buildings;