class BuildQueueBuilding < Granite::Base
  # Keeps track of the Buildings in a Village's BuildQueue
  adapter pg
  table_name build_queue_buildings

  belongs_to :build_queue
  belongs_to :building

  field time_already_spent : Int64

  # Helpers
  def progress
    # Helper that returns the completion progress of the current building as a percentage
    (self.time_already_spent.not_nil! * 100 / self.building.not_nil!.build_time.not_nil!).to_i
  end
end

class BuildingFurnishing < Granite::Base
  # Keeps track of how much of each kind of Furnishing are in a Building
  adapter pg
  table_name building_furnishings

  belongs_to :building
  belongs_to :furnishing

  field count : Int64
end

class BuildingRequirement < Granite::Base
  # Keeps track of buildings that are required to already exist before a building can be created
  adapter pg
  table_name building_requirements

  belongs_to :building

  field required_building_id : Int64
  field count : Int64

  def to_s
    # Since the required_lookup isn't done by belongs_to we'll have to do it ourselves
    required_building = Building.find self.required_building_id
    "#{self.building.to_s} requires #{self.count} #{required_building.to_s} to be present"
  end
end

class BuildingResource < Granite::Base
  # Keeps track of how many Resources it takes to build each Building type
  adapter pg
  table_name building_resources

  belongs_to :resource
  belongs_to :building

  field count : Int64
end

class RequiredCrafter < Granite::Base
  # Keeps track of which Crafters are required to build each Building
  adapter pg
  table_name required_crafters

  belongs_to :building
  belongs_to :crafter
end

class ResidingCrafter < Granite::Base
  # Keeps track of which Crafters live in a Village
  adapter pg
  table_name residing_crafters

  belongs_to :village
  belongs_to :crafter

  field name : String
end

class ResourceStore < Granite::Base
  # Keeps track of how many of each Resource are in a Village's stores
  adapter pg
  table_name resource_stores

  belongs_to :resource
  belongs_to :village

  field count : Int64

  def ResourceStore.get_data_for_village(village_id : Int64)
    # For a given village, returns a hash of all the resources and their counts
    # Get all ResourceStore elements relating to the passed village
    data = [] of Hash(Symbol, Union(String | Int64))
    ResourceStore.find_each("WHERE village_id = ?", [village_id]) do |resource_store|
      resource_data = resource_store.resource.to_hash
      new_data = {} of Symbol => Union(String | Int64)
      resource_data.each do |k, v|
        new_data[k] = v
      end
      new_data[:count] = resource_store.count.not_nil!
      new_data[:id] = resource_store.resource.id.not_nil!
      data << new_data
    end
    data
  end
end

class VillageBuilding < Granite::Base
  # Keeps track of how many of each Building are in a Village
  adapter pg
  table_name village_buildings

  belongs_to :village
  belongs_to :building

  field count : Int64
end
