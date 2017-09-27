import ReactDOM from "react-dom";
import React from "react";
import { load } from "news/services/i18n";

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

export const i18n = {

  async load() {
    jasmine.Ajax.install();
    jasmine.Ajax.stubRequest(/.*/).andReturn({
      status: 200,
      statusText: "HTTP/1.1 200 OK",
      contentType: "application/json",
      responseText: "{}"
    });

    try {
      await load("en");
    } catch (e) {
      console.error(e);
    }

    jasmine.Ajax.uninstall();
  },

  unload() {
  },

};
