div.input-field.col.s12
  input#name type="text" name="name" value="#{model.name}"
  label for="name" = "Name"
div.input-field.file-field.col.s12
  div.btn.indigo.darken-4
    span
      | Icon
    input type="file" accept="image/*" name="icon_file"
  div.file-path-wrapper
    input.file-path.validate type="text" value="#{model.icon}"