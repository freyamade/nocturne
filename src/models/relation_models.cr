class ResourceStore < Granite::ORM::Base
  # Keeps track of how many of each Resource are in a Village's stores
  adapter pg
  table_name resource_stores

  belongs_to :resource
  belongs_to :village

  field count : Int64
end

class BuildingResource < Granite::ORM::Base
  # Keeps track of how many Resources it takes to build each Building type
  adapter pg
  table_name building_resources

  belongs_to :resource
  belongs_to :building

  field count : Int64
end

class VillageBuilding < Granite::ORM::Base
  # Keeps track of how many of each Building are in a Village
  adapter pg
  table_name village_buildings

  belongs_to :village
  belongs_to :building

  field count : Int64
end

class BuildingFurnishing < Granite::ORM::Base
  # Keeps track of how much of each kind of Furnishing are in a Building
  adapter pg
  table_name building_furnishings

  belongs_to :building
  belongs_to :furnishing

  field count : Int64
end

class RequiredCrafters < Granite::ORM::Base
  # Keeps track of which Crafters are required to build each Building
  adapter pg
  table_name required_crafters

  belongs_to :building
  belongs_to :crafter
end

class ResidingCrafters < Granite::ORM::Base
  # Keeps track of which Crafters live in a Village
  adapter pg
  table_name residing_artisans

  belongs_to :village
  belongs_to :crafter

  field name : String
end

class BuildQueueBuildings < Granite::ORM::Base
  # Keeps track of the Buildings in a Village's BuildQueue
  adapter pg
  table_name build_queue_buildings

  belongs_to :build_queue
  belongs_to :building

  field time_already_spent : Int64
end
