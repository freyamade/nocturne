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
end
