doctype html
html
  head
    - subtitle = model_class.name != "Object" ? "- #{model_class.name}" : ""
    title = "Nocturne Admin Page #{subtitle}"
    == render(partial: "layouts/_head_common.slang")

  body
    div.container-fluid
      == render(partial: "layouts/_admin_nav.slang")
    div.container
      - if !flash.empty?
        div.row
          - flash.each do |key, value|
            div class="card alert-#{key}"
              div.card-content.white-text
                p = value
      div.row
        div.col.s12
          == content

    == render(partial: "layouts/_scripts_common.slang")
