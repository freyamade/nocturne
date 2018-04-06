class AdminController < ApplicationController
  private def redirect_non_admin
    if !signed_in?
      # Redirect to the login page
      flash[:info] = "Must be logged in"
      redirect_to "/signin"
    end
    # Check that the user is signed in as a user who is an admin
    # Current user can't be nil at this point as we already redirect non-authenticated requests
    if !current_user.not_nil!.admin
      redirect_to "/"
    end
  end

  before_action do
    all { redirect_non_admin }
  end

  def index
    render("index.slang")
  end
end
