import * as React from "react";
import { ArticleResult } from "news/services/times-api";
import { calendar as formatDate } from "news/services/date-utils";

interface Props {
  article : ArticleResult;
  className? : string;
}

const Byline : React.SFC<Props> = function(props : Props) : JSX.Element {
  const { article } = props;
  const contents = [
    <div key="pub" className="article-listing__pub-date">{formatDate(article.pub_date)}</div>,
  ];

  if(article.byline && article.byline.original) {
    contents.unshift(<div key="author" className="article-listing__author">{article.byline.original}</div>);
  }

  const classes = ["flex", "position-relative"];

  if(props.className) {
    classes.push(props.className);
  }

  return (<footer className={classes.join(" ")}>{contents}</footer>);
};

export default Byline;
