import * as React from "react";
import { render } from "react-dom";

// Using HashRouter here because live-server redirects w/ hash.
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import routes from "news/routes";
import { load as loadLocale } from "news/services/i18n";
import Header from "news/components/header";
import RouteLoader from "news/components/hoc/route-loader";
import ApplicationError from "news/components/application-error";
import Viewport from "news/services/viewport";

const main = document.getElementById("main");

class Application extends React.Component<any, any> {

  render() : JSX.Element {
    const routeList : Array<JSX.Element> = [];

    for (let i = 0, c = routes.length; i < c; i++) {
      const r = routes[i];
      routeList.push(<Route {...r} component={r.component_module && RouteLoader(r.component_module, r.resolve)} />);
    }

    return (
      <Router>
        <main>
          <Header />
          <Switch>{routeList}</Switch>
        </main>
      </Router>
    );
  }

}

function start() : void {
  Viewport.mount();
  render(<Application />, main);
}

loadLocale("en").then(start).catch(e => {
  /* tslint:disable */
  console.error(e);
  /* tslint:enable */

  render(<ApplicationError />, main);
});
