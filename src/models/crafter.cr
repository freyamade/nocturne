class Crafter < Granite::Base
  adapter pg
  table_name crafters

  # Relations
  has_many :required_to_build, through: :required_crafters
  has_many :residing_crafters

  # id : Int64 primary key is created for you
  field type : String
  field skill_level : Int32
  timestamps

  # Validation
  validate(:type, "is required.", ->(crafter : self) {
    (crafter != nil && crafter.type != "")
  })
  validate(:skill_level, "is required and is in the range 1 - 4.", ->(crafter : self) {
    (crafter != nil && crafter.skill_level != "" && crafter.skill_level.not_nil!.to_i.between? 1..4)
  })

  def skill_text
    self.skill_names[self.skill_level.not_nil!]
  end

  def to_s
    "#{self.skill_text} #{self.type}"
  end

  # Skill level map
  def skill_names
    {
      1 => "Apprentice",
      2 => "Journeyman",
      3 => "Master",
      4 => "Grand Master",
    }
  end
end
