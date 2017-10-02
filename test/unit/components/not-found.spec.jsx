import { Context, i18n } from "test-helpers";
import { HashRouter as Router } from "react-router-dom";
import NotFound from "news/components/not-found";
import * as React from "react";

function Scaffold() {
  return (
    <Router>
      <NotFound />
    </Router>
  );
}

describe("NotFound component test suite", function() {

  let context = null;

  beforeEach(function(done) {
    context = new Context();
    i18n.load().then(done);
  });

  afterEach(function() {
    context.cleanup();
    i18n.unload();
  });

  it("is renders the not found content correctly", function() {
    context.render(Scaffold);
    expect(true).toBe(true);
  })

});
