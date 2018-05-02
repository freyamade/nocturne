require "granite_orm/adapter/pg"
require "crypto/bcrypt/password"

class User < Granite::ORM::Base
  include Crypto
  adapter pg
  primary id : Int64
  field name : String
  field admin : Bool
  field player : Bool
  field email : String
  field hashed_password : String
  timestamps

  validate :name, "is required", ->(user : User) do
    (name = user.name) ? !name.empty? : false
  end

  validate :email, "is required", ->(user : User) do
    (email = user.email) ? !email.empty? : false
  end

  validate :email, "already in use", ->(user : User) do
    existing = User.find_by :email, user.email
    # The initial version ensured only that a user did not exist with this email
    # However, since this causes errors when updating users, this should be changed to check if another user has this email
    if existing
      # Check that the existing user's id does not match this user's
      return existing.id == user.id
    else
      # It's valid
      return true
    end
  end

  validate :password, "is too short. Passwords should be at least 8 characters long.", ->(user : User) do
    user.password_changed? ? user.valid_password_size? : true
  end

  def name=(name)
    @name = name
  end

  def name
    name
  end

  def password=(password)
    @new_password = password
    @hashed_password = Bcrypt::Password.create(password, cost: 10).to_s
  end

  def password
    (hash = hashed_password) ? Bcrypt::Password.new(hash) : nil
  end

  def password_changed?
    new_password ? true : false
  end

  def valid_password_size?
    (pass = new_password) ? pass.size >= 8 : false
  end

  def authenticate(password : String)
    (bcrypt_pass = self.password) ? bcrypt_pass == password : false
  end

  def is_admin?
    @admin
  end

  private getter new_password : String?
end
