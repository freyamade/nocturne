span.card-title = "Create a new Building"

form action="." method="POST"
  input name="_csrf" type="hidden" value="#{csrf_token}"
  div.input-field.col.s12
    input#name type="text" name="name" value="#{name}"
    label for="name" = "Name"
  div.input-field.col.s12
    input#level type="number" name="level" value="#{level}"
    label for="level" = "Level"
  div.input-field.col.s12
    input#build_time type="number" name="build_time" value="#{build_time}" step="15"
    label for="build_time" = "Build Time (in minutes)"
  div.input-field.col.s12
    input#population type="number" name="population" value="#{population}"
    label for="population" = "Population"
  div.input-field.col.s12
    textarea#description.materialize-textarea name="description" value="#{description}"
    label for="description" = "Building Description"
  div.col.s12
    label
      input type="checkbox" name="unique_per_village"
      span = "Only 1 per Village"
    button.btn.waves-effect.waves-light.indigo.darken-4.right type="submit" name="action"
      | Submit
      i.material-icons.right
        | send
