class AuthController < ApplicationController
  def signin
    # Function that will allow me to be able to tell if the template is loaded from signin or signup
    true
  end

  def new
    user = User.new
    render("signinup.slang")
  end

  def create
    user = User.find_by(:email, params["email"].to_s)
    if user && user.authenticate(params["password"].to_s)
      session[:user_id] = user.id
      flash[:info] = "Successfully logged in"
      # Check if there's a next query param
      if request.query_params && request.query_params.has_key? "next"
        redirect_to request.query_params["next"]
      else
        redirect_to "/"
      end
    else
      flash[:danger] = "Invalid email or password"
      user = User.new
      render("signinup.slang")
    end
  end

  def delete
    session.delete(:user_id)
    flash[:info] = "Logged out. See ya later!"
    redirect_to "/"
  end

  def register
    signin = false
    passwords_match = true
    user = User.new(registration_params.validate!)
    # First ensure that passwords match
    if !params[:password]? || !params[:confirm_password] || params[:password] != params[:confirm_password]
      # Display an error
      passwords_match = false
      user.errors << Granite::ORM::Error.new(:passwords, "do not match.")
    end
    user.password = params["password"].to_s
    user.admin = false

    if user.valid? && passwords_match && user.save
      session[:user_id] = user.id
      flash["success"] = "Created User successfully."
      redirect_to "/"
    else
      flash["danger"] = "Could not create User!"
      render "signinup.slang"
    end
  end

  private def registration_params
    params.validation do
      required(:name) { |f| !f.nil? }
      required(:email) { |f| !f.nil? }
      required(:password) { |f| !f.nil? }
      required(:confirm_password) { |f| !f.nil? }
    end
  end
end
