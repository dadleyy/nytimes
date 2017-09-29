import * as React from "react";
import { RouteComponentProps as RouteProps } from "react-router";
import ArticleListing, { Delegate } from "news/components/article-listing";
import t from "news/services/i18n";

export interface DisplayProps {
  delegate : Delegate;
  history : History;
}

const Display : React.SFC<DisplayProps> = function(props : DisplayProps) : JSX.Element {
  const { delegate } = props;

  return (
    <section className="padding-tb-10">
      <header className="padding-lr-10 width-page margin-middle margin-bottom-8">
        <h1 className="fs-12 ff-serif bold fg-00">{t("top_stories")}</h1>
      </header>
      <main className="padding-lr-10 width-page margin-auto">
        <ArticleListing {...props} />
      </main>
    </section>
  );
};

export default Display;
