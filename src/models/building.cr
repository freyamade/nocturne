class Building < Granite::ORM::Base
  adapter pg
  table_name buildings

  # Relations
  has_many :building_resources
  has_many :village_buildings
  has_many :building_furnishings
  has_many :craft_skills, through: :required_crafters
  has_many :build_queue_buildings

  # id : Int64 primary key is created for you
  field name : String
  field level : Int32
  field build_time : Int32
  field unique_per_village : Bool
  field population : Int32
  field description : String
  timestamps
end
