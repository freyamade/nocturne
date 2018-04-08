class SessionController < ApplicationController
  def new
    user = User.new
    render("new.slang")
  end

  def create
    user = User.find_by(:email, params["email"].to_s)
    if user && user.authenticate(params["password"].to_s)
      session[:user_id] = user.id
      flash[:info] = "Successfully logged in"
      # Check if there's a next query param
      if request.query_params
        redirect_to request.query_params["next"]
      else
        redirect_to "/"
      end
    else
      flash[:danger] = "Invalid email or password"
      user = User.new
      render("new.slang")
    end
  end

  def delete
    session.delete(:user_id)
    flash[:info] = "Logged out. See ya later!"
    redirect_to "/"
  end
end
