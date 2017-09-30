import * as React from "react";
import { ArticleResult, SECTION } from "news/services/times-api";
import Breadcrumbs from "news/components/breadcrumbs";
import Byline from "news/components/article-byline";
import { Link } from "react-router-dom";
import t from "news/services/i18n";
import environment from "news/config/environment";
const { placeholder_image_url } = environment;

export interface DisplayProps {
  article : ArticleResult;
}

const Display : React.SFC<DisplayProps> = function(props : DisplayProps) : JSX.Element {
  const { article } = props;

  let category_link : string;

  switch(article.new_desk) {
    case SECTION.AUTOMOBILES:
      category_link = "/news/automobiles";
      break;
    case SECTION.WORLD:
      category_link = "/news/world";
      break;
    case SECTION.POLITICS:
      category_link = "/news/politics";
      break;
    case SECTION.US:
      category_link = "/news/us";
      break;
    default:
      const [slug] = article.new_desk.split("/");
      const category = SECTION[slug.trim().toUpperCase() as keyof typeof SECTION];
      category_link = category ? `/news/${category}` : "/news/home";
  }
  const { multimedia } = article;
  const [image = { url: placeholder_image_url }] = multimedia.filter(s => s.subtype === "xlarge");

  return (
    <main className="article-display width-page margin-auto padding-tb-10">
      <header className="padding-lr-10 margin-bottom-10">
        <Breadcrumbs>
          <Link to={category_link}>{article.new_desk}</Link>
          <h3 className="article-display__crumb-title">{article.headline.main}</h3>
        </Breadcrumbs>
      </header>
      <article className="padding-lr-10">
        <header className="margin-bottom-10">
          <h1 className="fs-10 margin-bottom-4 block">{article.headline.main}</h1>
          <Byline article={article} className="fs-4" />
        </header>
        <main className="padding-top-10 flex">
          <aside className="article-display__image">
            <img src={image.url} width="100%" className="block border-1 bc-05" />
          </aside>
          <section className="article-display__full-content">
            <p>{article.snippet}</p>
          </section>
        </main>
      </article>
    </main>
  );
};

export default Display;
