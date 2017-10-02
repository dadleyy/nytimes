import { RouteProps, RouteComponentProps } from "react-router";

export type RouteResolutionHandler = (props : RouteComponentProps<any>) => Promise<boolean>;

export class RedirectError extends Error {
  code : number = 300;
  location : string;

  constructor(location = "/") {
    super();
    this.location = location;
  }
}

export interface RouteConfig extends RouteProps {
  component_module : string;
  resolve? : RouteResolutionHandler;
  render? : () => JSX.Element;
}
