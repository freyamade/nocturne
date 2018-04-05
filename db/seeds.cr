require "../config/application.cr"

user = User.new
user.email = "admin@example.com"
user.password = "password"
user.save
