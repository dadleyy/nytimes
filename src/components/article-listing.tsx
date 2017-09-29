import * as React from "react";
import times, { ArticleResult, TimesMeta, ArticleSearchBlueprint, SECTION } from "news/services/times-api";
import InfiniteList, { ListProps, ListItemProps, DataResults, LoadParams } from "news/components/hoc/infinite-list";
import { Link } from "react-router-dom";
import { calendar as formatDate } from "news/services/date-utils";
import environment from "news/config/environment";
import t from "news/services/i18n";

const { placeholder_image_url } = environment;

interface ResultHistoryItem {
  end_date : Date;
  items : Array<ArticleResult>;
  meta : TimesMeta;
}

export class Delegate {
  private results : Array<ResultHistoryItem> = [];
  private category : SECTION;
  private cache : Array<ResultHistoryItem> = [];

  constructor(category : SECTION) {
    this.category = category;
  }

  async load(params : LoadParams, cacheResult? : boolean) : Promise<DataResults> {
    const { results, cache } = this;

    if (cache.length >= 1) {
      const [latest] = cache;
      cache.length = 0;

      // If we had a cached item, return it.
      return latest;
    }

    const blueprint = new ArticleSearchBlueprint({ sections: [this.category] });
    const end_date = results.length >= 1 ? results.pop().end_date : new Date();

    const { meta, docs: items } = await times.search(blueprint, { end_date });

    const earliest_date = new Date(items[items.length - 1].pub_date);

    results.push({ meta, items, end_date: earliest_date });

    if(cacheResult === true) {
      this.cache.push({ meta, items, end_date });
    }

    return { meta, items };
  }

}

export type ItemProps = ListItemProps<ArticleResult>;

const Item : React.SFC<ItemProps> = function(props : ItemProps) : JSX.Element {
  const { item } = props;
  const { multimedia } = item;
  const [image = { url: placeholder_image_url }] = multimedia.filter(s => s.subtype === "xlarge");
  const thumbStyle = {
    backgroundImage: `url(${image.url})`
  };

  const footer_contents : Array<JSX.Element> = [(
    <span key="pub" className="article-listing__pub-date">{formatDate(item.pub_date)}</span>
  )];

  if(item.byline && item.byline.original) {
    footer_contents.unshift(<span key="author" className="article-listing__author">{item.byline.original}</span>);
  }

  const article_path = `/articles/${item.id}`;

  // Render out our item...
  return (
    <article className="article-listing">
      <aside className="article-listing__thumbnail" style={thumbStyle}>
      </aside>
      <main className="article-listing__content">
        <header className="article-listing__title">
          <Link to={article_path}>
            <p className="inherit-all padding-tb-1 ff-open semi-bold">{item.headline.main}</p>
          </Link>
        </header>
        <section className="article-listing__snippet">
          <p>{item.snippet}</p>
        </section>
        <footer className="article-listing__byline">{footer_contents}</footer>
      </main>
    </article>
  );
};

export default InfiniteList(Item);
