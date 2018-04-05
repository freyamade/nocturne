h1 Edit Profile

- if user.errors
  ul.errors
  - user.errors.each do |error|
    li = error.to_s

== form(action: "/profile", method: :patch) do
  == csrf_tag
  .form-group
    input.form-control type="email" name="email" placeholder="Email" value="#{user.email}"
  == submit("Update", class: "btn btn-primary btn-xs")
  == link_to("profile", "/profile", class: "btn btn-default btn-xs")
