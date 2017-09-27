import * as React from "react";
import { RouteComponentProps } from "react-router";
import { RouteResolutionHandler } from "news/route";
import ApplicationError from "news/components/application-error";
import LazyLoader from "news/services/lazy-loader";
import t from "news/services/i18n";

// Ugly but needed for lazy loading w/o webpack treating `require` calls below as bundle to optimize.
declare global {
  interface Window { require : Require; }
}

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

async function resolve(props : any, componentName : string, handler? : RouteResolutionHandler) : Promise<ResolutionResult> {
  const result : ResolutionResult = { resolution: null };

  try {
    result.resolution = handler ? await handler(props) : { };
  } catch (error) {
    return { error, resolution : null, component : null};
  }

  try {
    const { default: component } = await LazyLoader<React.ComponentClass>(componentName)
    result.component = component;
  } catch (error) {
    return { error, resolution : null, component : null};
  }

  return result;
}

const Factory = function(componentName : string, handler? : RouteResolutionHandler) : React.ComponentClass<any> {
  class Loader extends React.Component<any, LoaderState> {

    componentDidCatch() {
    }

    componentDidMount() {
      resolve(this.props, componentName, handler).then((resolution : ResolutionResult) => {
        this.setState(resolution);
      });
    }

    componentDidUpdate() {
      resolve(this.props, componentName, handler).then((resolution : ResolutionResult) => {
        // this.setState(resolution);
      });
      console.log('updating');
    }

    render() : JSX.Element {
      const { state } = this;

      if (state && state.component) {
        return <state.component {...state.resolution} />;
      }

      if (state && state.error) {
        return <ApplicationError error={state.error} />
      }

      return (
        <section>
          <p>{t("loading")}</p>
        </section>
      );
    }

  }

  return Loader;
};

export default Factory;
