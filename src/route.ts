import { RouteProps, RouteComponentProps } from "react-router";

export type RouteResolutionHandler = (props : RouteComponentProps<any>) => Promise<boolean>;

export interface RouteConfig extends RouteProps {
  componentModule : string;
  resolve? : RouteResolutionHandler;
}
