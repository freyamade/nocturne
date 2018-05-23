doctype html
html lang="en"
  head
    title The Village Of Nocturne
    meta charset="utf-8"
    meta http-equiv="X-UA-Compatible" content="IE=edge"
    meta name="viewport" content="width=device-width, initial-scale=1"
    meta name="description" content="A website for the village of Nocturne, the setting for a D&D campaign I'm running"
    link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
    link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Lato|Jua"
    link rel="stylesheet" href="/dist/main.bundle.css"

  body
    div.container-fluid
      == render(partial: "layouts/_player_nav.slang")
    div.container-fluid
      - if !flash.empty?
        div.row
          - flash.each do |key, value|
            div class="card alert-#{key}"
              div.card-content.white-text
                p = value
      div.row
        == content

    script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"
    script src="/dist/main.bundle.js"
