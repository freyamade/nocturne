div.col.s12
  div.card.z-index-5
    div.card-tabs
      ul.tabs.tabs-fixed-width
        li.tab
          a.indigo-text.text-darken-4 href="#signin"
            | Sign In
        li.tab
          a.indigo-text.text-darken-4 href="#signup"
            | Sign Up
    div.card-content
      div#signin.row
        - if signin && user.errors
          - user.errors.each do |e|
            div.card.alert-danger.white-text
              = e.to_s
        form.col.s12 action="/session/?#{request.query}" method="post"
          == csrf_tag
          div.input-field
            input#email type="text" name="email"
            label for="email" = "Email"
          div.input-field
            input#password type="password" name="password"
            label for="password" = "Password"
          button.btn.waves-effect.waves-light.indigo.darken-4.right type="submit" name="action"
            | Submit
            i.material-icons.right
              | send

      div#signup.row
        - if !signin && user.errors
          - user.errors.each do |e|
            div.card.alert-danger.white-text
              = e.to_s
        form.col.s12 action="/registration/#signup" method="post"
          == csrf_tag
          div.input-field
            input#name type="text" name="name" value="#{user.name}"
            label for="name" = "Name"
          div.input-field
            input#email type="text" name="email" value="#{user.email}"
            label for="email" = "Email"
          div.input-field
            input#password type="password" name="password"
            label for="password" = "Password"
          div.input-field
            input#password-confirm type="password" name="password_confirm"
            label for="password-confirm" = "Confirm Password"
          button.btn.waves-effect.waves-light.indigo.darken-4.right type="submit" name="action"
            | Submit
            i.material-icons.right
              | send
