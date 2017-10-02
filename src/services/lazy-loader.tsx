import * as React from "react";

type ResolutionHandler = <T>(result : LazyModule<T>) => void;
type RejectionHandler = () => void;

export interface LazyModule<T> {
  default : T;
}

export default function<T>(module_name : string) : Promise<LazyModule<T>> {
  function load(resolve : ResolutionHandler, reject : ResolutionHandler) : void {
    const deps = [module_name];

    function extract(required : LazyModule<T>) : void {
      resolve(required);
    }

    require(deps, extract, reject);
  }

  return new Promise(load);
}
