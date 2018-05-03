div.input-field.col.s12
  input#type type="text" name="type" value="#{model.type}"
  label for="type" = "Crafter Type"
div.input-field.col.s12
  select name="skill_level"
    - model.skill_names.each do |value, name|
      - if value == model.skill_level
        option value="#{value}" selected="selected" = name
      - else
        option value="#{value}" = name
