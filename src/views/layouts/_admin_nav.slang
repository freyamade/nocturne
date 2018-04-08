nav.indigo.darken-4
  div.nav-wrapper
    a.brand-logo href="/admin"
      | Nocturne Admin Panel
    a.sidenav-trigger.show-on-med-and-down data-target="mobile-menu"
      i.material-icons
        | menu
    ul#nav-mobile.right.hide-on-med-and-down
      li
        a href="/" = "Home"

ul.sidenav#mobile-menu
  li
    a href="/" = "Home"

