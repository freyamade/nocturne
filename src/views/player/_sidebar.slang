div.card.indigo-text.text-darken-4.large
  div.card-tabs
    ul.tabs
      li.tab.col.s4
        a.text-darken-4.indigo-text href="#sidebar-resources" | Resources
      li.tab.col.s4
        a.text-darken-4.indigo-text href="#sidebar-craftspeople" | Craftspeople
      li.tab.col.s4
        a.text-darken-4.indigo-text href="#sidebar-construction" | Build Queue
  div.card-content
    div#sidebar-resources
      ul.collection
        - nocturne.resource_stores.each do |rs|
          li.collection-item.avatar
            img.circle src="/resources/#{rs.resource.icon}"
            span.title = rs.resource.name
            span.secondary-content.text-darken-4.indigo-text = "Stock: #{rs.count}"
    div#sidebar-craftspeople
      ul.collection
        - nocturne.residing_crafters.each do |rc|
          li.collection-item
            span.title
              = rc.name
            span.secondary-content.text-darken-4.indigo-text
              small = "#{rc.crafter.to_s}"
    div#sidebar-construction
      ul.collection#build-queue
        - nocturne.build_queue.build_queue_buildings.each.with_index do |bqb, i|
          li.collection-item
            = bqb.building.to_s
            - if i == 0
              span.secondary-content
                span.badge.new data-badge-caption="% complete"
                  = bqb.progress
