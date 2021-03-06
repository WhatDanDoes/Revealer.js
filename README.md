# Revealer.js

A multi-user Reveal.js presentation server using Express.js and Socket.IO.

This is the complete code used in the http://www.sitepoint.com/create-multi-user-presentation-reveal-js/ article.  

## This Fork

The original project from which this was forked is falling out of date. This fork:

- Updates package dependencies
- DRYs out code with EJS partials
- Uses `.env` to protect master authentication info
- Easy Docker deployment

Thanks to [shameerc](https://github.com/shameerc/Revealer.js.git) for the awesome software.

# Development

## Setup

```
git clone https://github.com/WhatDanDoes/Revealer.js.git
npm install && bower install
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

The default configuration looks like this:

```
NAME=Revealer - Reveal.js multiplexer
HOST=http://localhost:3000/
USERNAME=user
PASSWORD=password
```

Update `HOST` if not serving on localhost, otherwise `socket.io` won't know where to connect.

## Serve

```
./node_modules/.bin/grunt
```

Master login at `http://localhost:3000/master`. (credentials as declared in `.env`).

Clients go to `http://localhost:3000` to see the presentation.

# Production

## App

Clone:

```
git clone https://github.com/WhatDanDoes/Revealer.js.git
```

In the application directory:

```
cd Revealer.js
npm install && bower install
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
USERNAME=user
PASSWORD=password
```

## Deploy

The _Dockerized_ production is meant to be deployed behind an `nginx-proxy`/`lets-encrypt` combo:

```
docker-compose -f docker-compose.prod.yml up -d
```

Edit `docker-compose.prod.yml` with host and Let's Encrypt info.
