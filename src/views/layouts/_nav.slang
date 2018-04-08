nav.indigo.darken-4
  div.nav-wrapper
    a.brand-logo href="/"
      img#logo.hide-on-med-and-down src="/dist/images/logo.svg" alt="Nocturne Coat of Arms" width="36" height="36"
      | Nocturne
    a.sidenav-trigger.show-on-med-and-down data-target="mobile-menu"
      i.material-icons
        | menu
    ul#nav-mobile.right.hide-on-med-and-down
      li
        - if (current_user == context.current_user)
          a href="/profile"
            | View Profile
        - else
          a href="/signin"
            | Sign In

ul.sidenav#mobile-menu
  li
    - if (current_user == context.current_user)
      a href="/profile"
        | View Profile
    - else
      a href="/signin"
        | Sign In
