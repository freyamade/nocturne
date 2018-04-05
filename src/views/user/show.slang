h1 Profile
p
  == user.email
  == link_to("edit", "/profile/edit", class: "btn btn-success btn-xs")
p
  == user.admin.to_s
