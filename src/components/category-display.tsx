import * as React from "react";
import ArticleListing, { Delegate } from "news/components/article-listing";

export interface DisplayProps {
  delegate : Delegate;
}

const Display : React.SFC<DisplayProps> = function(props : DisplayProps) : JSX.Element {
  const { delegate } = props;

  return (
    <section className="padding-tb-10">
      <header>
      </header>
      <main className="width-page margin-auto"><ArticleListing delegate={delegate} /></main>
    </section>
  );
};

export default Display;
