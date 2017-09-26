import ReactDOM from "react-dom";
import React from "react";

export class Context {

  constructor() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  cleanup() {
    document.body.removeChild(this.container);
  }

  render(Component, props = { }) {
    ReactDOM.render(<Component {...props} />, this.container);
  }

}
