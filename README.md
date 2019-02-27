## Revealer.js

A multi-user Reveal.js presentation server using Express.js and Socket.IO.

This is the complete code used in the http://www.sitepoint.com/create-multi-user-presentation-reveal-js/ article.  

## This Fork

The original project from which this was forked is falling out of date. This fork:

- Updates some dependencies
- Makes better use of Express partials
- Deploys master and client versions from different defaults
- Uses `.env` to protect master authentication info
- Easy Docker deployment

Thanks to [shameerc](https://github.com/WhatDanDoes/Revealer.js.git) for the awesome software.

## Build

Reveal.js, as downloaded by `bower`, doesn't build the required Javascript or CSS. Before running the dev server, build the downloaded software:

```
npm --prefix public/components/reveal.js/ install
grunt --gruntfile public/components/reveal.js/Gruntfile.js
```

## Development

```
$ git clone https://github.com/shameerc/Revealer.js.git
$ npm install && bower install
$ grunt
```

Master login at `http://localhost:3001`.

Clients go to `http://localhost:3000/client` to see the presentation.

**Note : You may need to update `host` in `public/js/config.js` when it's not in localhost.**
