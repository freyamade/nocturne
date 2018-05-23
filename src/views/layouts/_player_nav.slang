nav.indigo.darken-4
  div.nav-wrapper
    a.brand-logo href="/nocturne/"
      img#logo.hide-on-med-and-down src="/dist/images/logo.svg" alt="Nocturne Coat of Arms" width="36" height="36"
      | The Village Of Nocturne
    a.sidenav-trigger.show-on-med-and-down data-target="mobile-menu"
      i.material-icons
        | menu
    ul#nav-mobile.right.hide-on-med-and-down
      li
        a href="/" = "Home"

ul.sidenav#mobile-menu
  li
    a href="/" = "Home"

