import * as React from "react";
import { render } from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import routes from "news/routes";

class Application extends React.Component<any, any> {

  render() : JSX.Element {
    const routeList : Array<JSX.Element> = [];

    for (let i = 0, c = routes.length; i < c; i++) {
      const r = routes[i];
      routeList.push(<Route {...r} />);
    }

    return (<Router><Switch>{routeList}</Switch></Router>);
  }

}

render(<Application />, document.getElementById("main"));
