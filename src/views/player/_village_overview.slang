div.card.indigo-text.text-darken-4.large
  div.card-content
    ul.collapsible
      - nocturne.village_buildings.each do |vb|
        li
          div.collapsible-header
            p = "#{vb.building.to_s}"
            span.secondary-content
            - if !vb.building.unique_per_village
              span.new.badge.indigo.darken-4 data-badge-caption="#{vb.count}"
            - else
              span.new.badge.indigo.darken-4 data-badge-caption="Unique"
          div.collapsible-body
            p = "#{vb.building.description}"

