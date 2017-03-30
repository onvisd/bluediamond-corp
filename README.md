# Blue Diamond Corporate

## Uses

* React
* React Router
* Redux
* Isomorphic (universal) rendering
* Webpack 2
* Development mode: hot reload for React components, hot reload for Redux reducers and actions


## Quick Start

* `npm install`
* `npm start`
* wait for startup to complete
* go to `http://localhost:3000`
* interact with the development version of the web application


## Quick Start (Production App)
* `npm install`
* `npm run production`
* wait a bit for Webpack to finish the build (green stats will appear in the terminal, plus some `node.js` server running commands)
* go to `http://localhost:3000`
* interact with the production version of the web application


## Summary

This application consists of the "client side" and the "server side".

The "client side" (`./client`) is the javascript code (`./client/app.js`) which is built by Webpack and is run in a user's web browser, along with the "page rendering service" (`./client/render-service`) which does the same thing but in a Node.js process on the server.

The "server side" consists of the "API service" (`./api`) and the "proxy service" (`./server`) which runs on port `3000` and routes various URL paths to their respective destinations:

* static assets ("static files", "assets") are served (in production mode only) at `/assets`
* `/api` is proxied to the "API service" (running on port `3003`)
* all other paths are proxied to the "page rendering service" (which runs on port `3002`).

In development mode there's one more Node.js process running: it's `webpack-dev-server` running on port `3001` which serves the "assets" compiled by Webpack (live) via HTTP protocol. In production there's no `webpack-dev-server` and Webpack just outputs those compiled assets to the `./client/build` folder and the "proxy service" (`./server`) serves those "assets" from there. In a real production environment though this proxy service should be dropped in favor of a proper proxy like nginx or HAProxy. Alternatively, assets could be hosted separately on a CDN. This "proxied" configuration is purely for development purposes.
