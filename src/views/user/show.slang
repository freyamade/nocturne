div.card.indigo-text.text-darken-4.z-depth-5
  div.card-content
    div.row
      div.card-title
        | Profile
            - if user.admin
              span.badge.new.badge.white.indigo-text.text-darken-4 data-badge-caption="Admin"
      form action="/profile/" method="POST"
        == csrf_tag
        input type="hidden" name="_method" value="patch"
        div.input-field.col.s12
          input#name type="text" name="name" value="#{user.name}"
          label for="name" = "Name"
        div.input-field.col.s12
          input#email type="text" name="email" value="#{user.email}"
          label for="email" = "Email"
        button.btn.waves-effect.waves-light.indigo.darken-4.right type="submit" name="action"
          | Update
          i.material-icons.right
            | send
      a.btn.waves-effect.waves-light.red.accent-3 href="/signout/"
        | Sign Out
        i.material-icons.right
          | reply


