div.col.s12.m8
  div.card.indigo.darken-4
    div.card-content.white-text
      span.card-title
        = "#{nocturne.to_s} Overview"
      div.row
        div.col.s12
          == render partial: "_village_overview.slang"
div.col.s12.m4
  div.card.indigo.darken-4
    div.card-content.white-text
      span.card-title
        | Sidebar
      p
        | Stuff like resource info, the build queue and all that will be here