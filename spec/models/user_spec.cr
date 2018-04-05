require "./spec_helper"
require "../../src/models/user.cr"

describe User do
  Spec.before_each do
    User.clear
  end
end
