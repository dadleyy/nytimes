import * as React from "react";

export interface ErrorProps {
  error? : Error;
}

const ApplicationError : React.SFC<ErrorProps> = function(props : ErrorProps) : JSX.Element {

  return (
    <section className="width-10 text-center padding-tb-4">
      <input name="error-message" type="hidden" value={props.error && props.error.toString()} />
      <input name="error-stack" type="hidden" value={props.error && props.error.stack} />
      <p>Something went wrong</p>
    </section>
  );
};

export default ApplicationError;
