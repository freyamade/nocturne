require "./spec_helper"
require "../../src/models/activity_log.cr"

describe ActivityLog do
  Spec.before_each do
    ActivityLog.clear
  end
end
