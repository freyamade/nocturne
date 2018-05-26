div.card.indigo-text.text-darken-4.large
  div.card-content
    ul.collection
      - nocturne.village_buildings.each do |vb|
        li.collection-item
          div
            a.modal-trigger.indigo-text.text-darken-4 href="#building-description-modal" data-building-id="#{vb.building.id}"
              = "#{vb.building.to_s}"
            - if !vb.building.unique_per_village
              span.new.badge.indigo.darken-4 data-badge-caption="#{vb.count}"
            - else
              span.new.badge.indigo.darken-4 data-badge-caption="Unique"

div#building-description-modal.modal.text-darken-4.indigo-text
  div.modal-content
    h4#building-title | placeholder
    ul.tabs
      li.tab.active.col.s6
        a.text-darken-4.indigo-text href="#building-description-modal-overview"
          | Overview
      li.tab.col.s6
        a.text-darken-4.indigo-text href="#building-description-modal-features"
          | Features
    div#building-description-modal-overview
      div#building-description-modal-overview-description
        p | A small house. It doesn't have much, but it's still better than sleeping outside!
    div#building-description-modal-features
      ul.collapsible
        li
          div.collapsible-header
            | Bed (Level 1)
          div.collapsible-body
            p | A simple bed that simply beats sleeping on the floor!
  div.modal-footer
    p.pull-left
      | Population Capacity:
      span#population-effect-badge.badge.new.population-increase data-badge-caption="+1"
