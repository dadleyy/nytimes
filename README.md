# NY Times React + Typescript

This is a demo app build with [react] and [typescript] that communicates with the [new york times api].

### Building & Serving

Rather than use a build system like [webpack] or [gulp], this project relies on the executables of it's compilers
directly; [`tsc`] for the typescript source, [`node-sass`] for the stylesheet, [`pug`] for the `index.html` file and
[`yaml2json`] for the i18n definitions. To do so, the  `package.json` has be configured with several `script` entries
that can be executed using the [`npm run`] command.

*This strategy does come with drawbacks however* - it is not easily configured to minify the compiled source, concatenate 
vendor libraries and the application relies on a runtime [`requirejs`] dependency which lazy-loads source files into
the browser as they are needed.

The runtime dependency on requirejs is especially difficult to circumvent as the entire
[routing architecture] relies on the ability to `require(...)` component modules after the route's resolution handler 
has resolved it's data or rejected (inspired by [`angular`]).


Once built, the project and be served using the `npm start` command which spins up a [`live-server`] instance configured
with the appropriate base directory, proxy and route settings for the single page application.

The most helpful commands for development are:

```
npm run build:scripts
  - compiles the typescript source code into the distributable directory
  -
npm run build:scripts -- --watch
  - watches and re-compiles all source files

npm run build:styles
  - compiles the sass source code into the distributable directory

npm run build:styles -- --watch
  - watches and re-compiles sass source files

npm run build:i18n
  - compiles the i18n definitions into json

npm run build:html
  - compiles the pug source code into the distributable directory

npm run build:html -- --watch
  - will watch the index.pug file for changes

npm test
  - runs the karma/jasmine unit tests

npm test -- --single=run=false --browsers=Chrome
  - continuously watches source files and runs test in a chrome browser (useful for debugging)
```

### `config.json` file

There are a few required environment variables are injected into the application during the compilation of the 
[`index.pug`] file that will be the page rendered by the [`live-server`] http server.

```json
{
  "environment": {
    "placeholder_image_url": "<full URI to a placeholder image>",
    "times": {
      "key": "<new york times api key>",
      "apis": {
        "search": "<search endpoint, typically /api/svc/search/v2/articlesearch.json>",
        "images": "<image host, typically http://static01.nyt.com"
      }
    }
  }
}
```

[react]: https://facebook.github.io/react
[typescript]: https://www.typescriptlang.org
[new york times api]: https://developer.nytimes.com
[`index.pug`]: https://github.com/dadleyy/nytimes/blob/cc826622a037bbe3658090f9f589df1b99a7dca4/src/index.pug
[`live-server`]: https://github.com/tapio/live-server
[`tsc`]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
[gulp]: https://gulpjs.com
[webpack]: https://webpack.js.org
[`node-sass`]: https://github.com/sass/node-sass
[`pug`]: https://github.com/pugjs/pug
[`yaml2json`]: https://github.com/bronze1man/yaml2json
[`npm run`]: https://docs.npmjs.com/cli/run-script
[`requirejs`]: http://requirejs.org
[`angular`]: https://code.angularjs.org/1.6.6/docs/api/ngRoute/provider/$routeProvider#when
[routing architecture]: https://github.com/dadleyy/nytimes/blob/cc826622a037bbe3658090f9f589df1b99a7dca4/src/components/hoc/route-loader.tsx
