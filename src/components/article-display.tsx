import * as React from "react";
import { ArticleResult } from "news/services/times-api";
import { Link } from "react-router-dom";

export interface DisplayProps {
  article : ArticleResult;
}

const Display : React.SFC<DisplayProps> = function(props : DisplayProps) : JSX.Element {
  const { article } = props;

  return (
    <main className="article-display width-page">
      <header>
        <Link to="/home">Home</Link>
      </header>
      <article>
      </article>
    </main>
  );
};

export default Display;
