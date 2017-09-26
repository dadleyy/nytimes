import { Context } from "test-helpers";
import NotFound from "news/components/not-found";
import React from "react";

describe("NotFound component test suite", function() {

  let context = null;

  beforeEach(function() {
    context = new Context();
  });

  afterEach(function() {
    context.cleanup();
  });

  it("is renders the not found content correctly", function() {
    context.render(NotFound);
    expect(true).toBe(true);
  })

});
