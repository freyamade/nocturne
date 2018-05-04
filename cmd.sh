#!/bin/bash
amber db create
# Separate these out because the migrations aren't run if the DB exists
amber db migrate
./bin/nocturne
