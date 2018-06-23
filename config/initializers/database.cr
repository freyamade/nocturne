require "granite/adapter/pg"

Granite.settings.database_url = Amber.settings.database_url
Granite.settings.logger = Amber.settings.logger.dup
Granite.settings.logger.progname = "Granite"
