doctype html
html
  head
    - subtitle = model_name ? "- #{model_name}" : ""
    title = "Nocturne Admin Page #{subtitle}"
    meta charset="utf-8"
    meta http-equiv="X-UA-Compatible" content="IE=edge"
    meta name="viewport" content="width=device-width, initial-scale=1"
    link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
    link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Lato|Jua"
    link rel="stylesheet" href="/dist/main.bundle.css"

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

    script src="https://code.jquery.com/jquery-3.3.1.min.js"
    script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"
    script src="/dist/main.bundle.js"
