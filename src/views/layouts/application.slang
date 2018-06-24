doctype html
html lang="en"
  head
    title The Village Of Nocturne
    == render(partial: "layouts/_head_common.slang")

  body
    div.container-fluid
      == render(partial: "layouts/_nav.slang")
    div.container
      - if !flash.empty?
        div.row
          - flash.each do |key, value|
            div class="card alert-#{key}"
              div.card-content.white-text
                p = value
      div.row
        div.col.s12.main
          == content

    == render(partial: "layouts/_scripts_common.slang")
