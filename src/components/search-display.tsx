import * as React from "react";
import ArticleListing, { Delegate } from "news/components/article-listing";

export interface DisplayProps {
  delegate : Delegate;
  history : History;
}

const Display : React.SFC<DisplayProps> = function(props : DisplayProps) : JSX.Element {
  const { delegate } = props;

  return (
    <main className="padding-lr-10 margin-tb-10 width-page margin-middle">
      <ArticleListing {...props} />
    </main>
  );
};

export default Display;
