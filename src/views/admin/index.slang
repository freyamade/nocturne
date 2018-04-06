div.s12
  div.card.z-index-5
    div.card-tabs
      ul.tabs.tabs-fixed-width
        li.tab
          a.indigo-text.text-darken-4 href="#models"
            | Models
        li.tab
          a.indigo-text.text-darken-4 href="#activity-log"
            | Activity Log
    div.card-content
      div#models
        ul.collection.with-header
          li.collection-header
            h4 = "Models"
          - models.each do |model|
            li.collection-item
              div
                = model.name
                a.secondary-content.indigo-text.text-darken-4 href="/admin/models/#{model.name.downcase}/"
                  i.material-icons
                    | send
          li.collection-header
            h4 = "Relationships"
          - relations.each do |model|
            li.collection-item
              div
                = model.name
                a.secondary-content.indigo-text.text-darken-4 href="/admin/relations/#{model.name.downcase}/"
                  i.material-icons
                    | send

      div#activity-log
        ul.collection
          - activities.each do |entry|
            li.collection-item
              = entry.event
              span.secondary-content.indigo-text.text-darken-4
                = entry.created_at
