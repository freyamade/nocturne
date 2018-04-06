class Crafter < Granite::ORM::Base
  adapter pg
  table_name crafters

  # Relations
  has_many :required_to_build, through: :required_crafters
  has_many :residing_crafters

  # id : Int64 primary key is created for you
  field type : String
  field skill_level : Int32
  timestamps
end
