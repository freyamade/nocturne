class Furnishing < Granite::ORM::Base
  adapter pg
  table_name furnishings

  # Relations
  has_many :building_furnishings

  # id : Int64 primary key is created for you
  field name : String
  field level : Int32
  field description : String
  field ability : String
  timestamps

  def to_s
    "#{self.name} (Level #{self.level})"
  end

  # Validation
  validate(:name, "parameter is required.", ->(furnishing : self) {
    (furnishing != nil && furnishing.name != "")
  })
  validate(:level, "parameter is required and must be above 0.", ->(furnishing : self) {
    (furnishing != nil && furnishing.level != "" && furnishing.level.not_nil!.to_i > 0)
  })
  validate(:description, "parameter is required.", ->(furnishing : self) {
    (furnishing != nil && furnishing.description != "")
  })
  validate(:ability, "parameter is required.", ->(furnishing : self) {
    (furnishing != nil && furnishing.ability != "")
  })
end
