require "./spec_helper"
require "../../src/models/build_queue.cr"

describe BuildQueue do
  Spec.before_each do
    BuildQueue.clear
  end
end
