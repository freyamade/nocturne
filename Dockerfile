FROM amberframework/amber:v0.7.2

WORKDIR /app

COPY . /app

# Set up necessary ENV variables
ENV AMBER_ENV "production"

# Install deps
RUN shards install
RUN npm install

# Build the binary
RUN npm run release
RUN shards build --production --release

EXPORT 8080

CMD ["/bin/bash", "cmd.sh"]
