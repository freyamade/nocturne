doctype html
html lang="en"
  head
    title The Village Of Nocturne
    == render(partial: "layouts/_head_common.slang")

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

    == render(partial: "layouts/_scripts_common.slang")
