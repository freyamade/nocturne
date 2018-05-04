div.input-field.col.s12
  input#name type="text" name="name" value="#{model.name}"
  label for="name" = "Name"
div.input-field.col.s12
  input#level type="number" name="level" value="#{model.level}"
  label for="level" = "Level"
div.input-field.col.s12
  textarea#description.materialize-textarea name="description" = "#{model.description}"
  label for="description" = "Furnishing Description"
div.input-field.col.s12
  textarea#ability.materialize-textarea name="ability" = "#{model.ability}"
  label for="ability" = "Furnishing Ability"