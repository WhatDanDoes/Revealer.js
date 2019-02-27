# Revealer.js

A multi-user Reveal.js presentation server using Express.js and Socket.IO.

This is the complete code used in the http://www.sitepoint.com/create-multi-user-presentation-reveal-js/ article.  

## This Fork

The original project from which this was forked is falling out of date. This fork:

- Updates some dependencies
- Makes better use of Express partials
- Deploys master and client versions from different defaults
- Uses `.env` to protect master authentication info
- Easy Docker deployment

Thanks to [shameerc](https://github.com/shameerc/Revealer.js.git) for the awesome software.

## Development

```
$ git clone https://github.com/WhatDanDoes/Revealer.js.git
$ npm install && bower install
$ ./node_modules/.bin/grunt
```

## Build

Reveal.js, as downloaded by `bower`, doesn't build the required Javascript or CSS. Before running the dev server, build the downloaded software:

```
npm --prefix public/components/reveal.js/ install
./node_modules/.bin/grunt --gruntfile public/components/reveal.js/Gruntfile.js
```

### Configure

```
cp .env.example .env
```

The default configuration looks like this:

```
NAME=Revealer - Reveal.js multiplexer
HOST=http://localhost:3000/
USER=user
PASS=password
```

Update `HOST` if not serving on localhost, otherwise `socket.io` won't know where to connect.


Master login at `http://localhost:3001`. (credentials as declared in `.env`).

Clients go to `http://localhost:3000/client` to see the presentation.

# Production

## App

Clone:

```
git clone https://github.com/WhatDanDoes/Revealer.js.git
```

In the application directory:

```
cd Revealer.js
NODE_ENV=production npm install && bower install
```

## Build

Reveal.js, as downloaded by `bower`, doesn't build the required Javascript or CSS. Before running the dev server, build the downloaded software:

```
npm --prefix public/components/reveal.js/ install
./node_modules/.bin/grunt --gruntfile public/components/reveal.js/Gruntfile.js
```

## Configure

```
cp .env.example .env
```

Update `HOST` to reflect the domain from which this app is served:

```
NAME=Revealer - Reveal.js multiplexer
HOST=http://example.com/
USER=user
PASS=password
```

## Deploy

The _Dockerized_ production is meant to be deployed behind an `nginx-proxy`/`lets-encrypt` combo:

```
docker-compose -f docker-compose.prod.yml up -d
```

Edit `docker-compose.prod.yml` with host and Let's Encrypt info.
