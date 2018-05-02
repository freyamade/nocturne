doctype html
html
  head
    title Nocturne Manager
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
          nav.indigo.darken-3
            div.nav-wrapper
              div.col.s12
                a.breadcrumb href="/admin/" = "Admin Panel"
                a.breadcrumb.disabled href="#"
                  = request.path.includes?("models") ? "Models" : "Relations"
                a.breadcrumb href="../" = "#{model_name}"
                a.breadcrumb href="#"
                - if is_read?
                  = params[:id]
                - else
                  | New

        div.col.s12
          div.card.z-index-5
            div.card-content
              div.row
                span.card-title
                  - if (is_read?)
                    = "Update #{model_name}"
                  - else
                    = "Create new #{model_name}"
                - if model.errors
                  - model.errors.each do |e|
                    div.card.alert-danger.white-text
                      = e.to_s
                form action="." method="POST"
                  == csrf_tag
                  - if (is_read?)
                    input name="_method" type="hidden" value="put"
                  == content
                  button.btn.waves-effect.waves-light.indigo.darken-4.right type="submit" name="action"
                    - if (is_read?)
                      | Update
                    - else
                      | Create
                    i.material-icons.right
                      | send
                - if (is_read?)
                  div.col.s12
                    form method="post"
                      input type="hidden" name="_method" value="delete"
                      input name="_csrf" type="hidden" value="#{csrf_token}"
                      button.btn.waves-effect.waves-light.red.accent-3 type="submit" name="action"
                        i.material-icons.left
                          | delete
                        | Delete

    script src="https://code.jquery.com/jquery-3.3.1.min.js"
    script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"
    script src="/dist/main.bundle.js"
