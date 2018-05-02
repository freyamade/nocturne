nav.indigo.darken-3
  div.nav-wrapper
    div.col.s12
      a.breadcrumb href="/admin/" = "Admin Panel"
      a.breadcrumb.disabled href="#"
        = request.path.includes?("models") ? "Models" : "Relations"
      a.breadcrumb.disabled href="#" = "#{model_name}"

div.col.s12
  div.card.z-index-5
    div.card-content
      ul.collection
        - instances.each do |instance|
            li.collection-item
              div
                = instance.to_s
                a.secondary-content.indigo-text.text-darken-4 href="#{instance.id}/"
                  i.material-icons
                    | send

div.fixed-action-button
  a.btn-floating.btn-large.indigo.darken-4 href="new/"
    i.material-icons.large
      | add
