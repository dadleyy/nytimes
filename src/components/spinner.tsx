import * as React from "react";

const Spinner : React.SFC<any> = function(props : any) : JSX.Element {

  // Markup taken from codepen
  return (
    <main className="text-center position-relative padding-tb-20">
      <div className="spinner-canvas">
        <div className="spinner-canvas__inner"></div>
      </div>
    </main>
  );
};

export default Spinner;
