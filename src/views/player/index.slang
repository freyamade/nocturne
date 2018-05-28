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