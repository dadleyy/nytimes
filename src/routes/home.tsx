import { Redirect } from "react-router-dom";
import * as React from "react";

export default {
  exact: true,
  path: "/",
  key: "home",
  render() : JSX.Element {
    // Redirect to home.
    return <Redirect to="/news/home" />;
  },
};
