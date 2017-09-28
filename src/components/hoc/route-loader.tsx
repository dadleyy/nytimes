import * as React from "react";
import { RouteComponentProps as RouteProps } from "react-router";
import { RouteResolutionHandler as Handler } from "news/route";
import ApplicationError from "news/components/application-error";
import LazyLoader from "news/services/lazy-loader";
import t from "news/services/i18n";

export interface LoaderState {
  component? : React.ComponentClass;
  error? : Error;
  resolution : any;
}

export interface ResolutionResult {
  component? : React.ComponentClass;
  error? : any;
  resolution : any;
}

const Factory = function<T>(componentName : string, handler? : Handler) : React.ComponentClass<RouteProps<T>> {
  class Loader extends React.Component<RouteProps<T>, LoaderState> {

    componentDidCatch() : void {
    }

    async fetch(props : RouteProps<T> = this.props) : Promise<ResolutionResult> {
      const result : ResolutionResult = { resolution: null };

      try {
        result.resolution = handler ? await handler(props) : { };
      } catch (error) {
        return { error, resolution : null, component : null};
      }

      try {
        const { default: component } = await LazyLoader<React.ComponentClass>(componentName);
        result.component = component;
      } catch (error) {
        return { error, resolution : null, component : null};
      }

      return result;
    }

    async componentWillReceiveProps(newProps : RouteProps<T>) : Promise<void> {
      this.setState({ component: null });
      const r = await this.fetch(newProps);
      this.setState(r);
    }

    async componentDidMount() : Promise<void> {
      const r = await this.fetch();
      this.setState(r);
    }

    render() : JSX.Element {
      const { state } = this;

      if (state && state.component) {
        return <state.component {...state.resolution} />;
      }

      if (state && state.error) {
        return <ApplicationError error={state.error} />;
      }

      return (
        <section className="width-page margin-auto padding-tb-10">
          <p>{t("loading")}</p>
        </section>
      );
    }

  }

  return Loader;
};

export default Factory;
