div.col.s12.m8
  div.card.indigo.darken-4
    div.card-content.white-text
      div.card-title | Buildings Overview
      div.row
        div.col.s12
          == render partial: "_village_overview.slang"
        p.right-align
          = "Population Capacity Remaining: #{nocturne.remaining_population}"
div.col.s12.m4
  div.card.indigo.darken-4
    div.card-content.white-text
      span.card-title
        | Management Overview
      div.row
        div.col.s12
          == render partial: "_sidebar.slang"
        p == "&nbsp;"

- if current_user.not_nil!.admin
  div.col.s12
    div.card.indigo-text.text-darken-4
      div.card-content
        div.row
          div.col.s3
            form action="admin/time_advance/" method="POST"
              == csrf_tag
              div.input-field.col.s12
                input#time_advance type="number" name="time_advance"
                label for="time_advance" = "Advance Time"
              button.btn.waves-effect.waves-light.indigo.darken-4.right type="submit" name="action"
                | Advance
                i.material-icons.right
                  | watch_later
          div.col.s3
            form action="admin/gather_resource/" method="POST"
              == csrf_tag
              div.input-field.col.s6
                input#amount type="number" name="amount"
                label for="amount" = "Amount Of Resource"
              div.input-field.col.s6
                select name="resource_id"
                  - resources.each do |r|
                    option value="#{r.id}" = r.to_s
              button.btn.waves-effect.waves-light.indigo.darken-4.right type="submit" name="action"
                | Gather
                i.material-icons.right
                  | account_balance
