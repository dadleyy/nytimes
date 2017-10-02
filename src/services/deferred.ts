export interface Deferred {
  resolve? : () => void;
  reject? : () => void;
  promise : Promise<any>;
}

export default function defer() : Deferred {
  const deferred : Deferred = { promise: null };

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}
