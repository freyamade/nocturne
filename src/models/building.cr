class Building < Granite::Base
  adapter pg
  table_name buildings

  # Relations
  has_many :building_resources
  has_many :village_buildings
  has_many :building_furnishings
  has_many :craft_skills, through: :required_crafters
  has_many :build_queue_buildings
  has_many :building_requirements

  # id : Int64 primary key is created for you
  field name : String
  field level : Int32
  field build_time : Int32 # Build time will be stored as minutes, displayed as hours
  field unique_per_village : Bool
  field population : Int32
  field description : String
  timestamps

  def to_s
    "#{self.name.not_nil!} (Level #{self.level.not_nil!})"
  end

  # Validation methods
  validate(:name, "parameter is required.", ->(building : self) {
    (building != nil && building.name != "")
  })
  validate(:level, "parameter is required, and should be in the range 1 -> 10.", ->(building : self) {
    (building != nil && building.level != "" && building.level.not_nil!.to_i.between? 1..10)
  })
  validate(:build_time, "parameter is required, and should be at least 30.", ->(building : self) {
    (building != nil && building.build_time != "" && building.build_time.not_nil!.to_i >= 30)
  })
  validate(:population, "parameter is required.", ->(building : self) {
    (building != nil && building.population != "")
  })
  validate(:description, "parameter is required.", ->(building : self) {
    (building != nil && building.description != "")
  })
end
