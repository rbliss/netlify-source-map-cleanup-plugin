# Netlify Source Map Cleanup

This plugin searches the build output directory for `*.js.map` and `*.css.map` files to delete. It also removes the `sourceMap` comment found in any .js files.

Helpful in cases where you want to generate source maps, but NOT have them deployed (like using Sentry), and also not have to rewire your CRA, or make tweaks to your Webpack configuration.
