# Nocturne

[![Waffle.io - Columns and their card count](https://badge.waffle.io/crnbrdrck/Nocturne.svg?columns=all)](https://waffle.io/crnbrdrck/Nocturne)

I am quite into being a Dungeon Master (DM) for games of Dungeons & Dragons. As such, I come up with stories to tell my players.

One such upcoming story involves a group of people getting caught in the wrong place at the wrong time (to over-oversimplify), and they will need to rebuild a village from nothing.

This is a webapp written in Crystal and powered by [Amber Framework](https://amberframework.org/), which both myself and the players will be using to manage the building of the village in a much easier (I hope) way than reams of paper.

## Installation

1. [Install required dependencies](https://github.com/amberframework/online-docs/blob/master/getting-started/quickstart/zero-to-deploy.md#install-crystal-and-amber)
2. Run `shards install`

## Usage

To setup your database edit `database_url` inside `config/environments/development.yml` file.

To edit your production settings use `amber encrypt`. [See encrypt command guide](https://github.com/amberframework/online-docs/blob/master/getting-started/cli/encrypt.md#encrypt-command)

To run amber server in a **development** enviroment:

```
amber db create migrate
amber watch
```

To build and run a **production** release:

1. Add an environment variable `AMBER_ENV` with a value of `production`
2. Run these commands (Note using `--release` is optional and may take a long time):

```
npm run release
amber db create migrate
shards build --production --release
./bin/nocturne
```

## Docker Compose

To set up the database and launch the server:

```
docker-compose up -d
```

To view the logs:

```
docker-compose logs -f
```

> **Note:** The Docker images are compatible with Heroku.

## Contributing

See the [Waffle Board](https://waffle.io/crnbrdrck/Nocturne) to see what needs to be made for the system :)

1. Assign yourself a card on the Waffleboard that you wish to work on
2. Fork it ( https://github.com/your-github-user/nocturne/fork )
3. Create your feature branch (git checkout -b my-new-feature)
4. Commit your changes (git commit -am 'Add some feature')
5. Push to the branch (git push origin my-new-feature)
6. Create a new Pull Request

If your Request is merged, I'll add you to the contributors list

## Contributors

- [crnbrdrck](https://github.com/crnbrdrck) Ciaran Broderick - creator, maintainer
