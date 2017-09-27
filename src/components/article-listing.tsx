import * as React from "react";
import times, { ArticleResult, TimesMeta, ArticleSearchBlueprint, SECTION } from "news/services/times-api";
import InfiniteList, { ListProps } from "news/components/hoc/infinite-list";

interface ResultHistoryItem {
  articles : Array<ArticleResult>;
  meta : TimesMeta;
}

export class Delegate {
  private results : Array<ResultHistoryItem> = [];
  private category : SECTION;

  constructor(category : SECTION) {
    this.category = category;
  }

  async load() : Promise<void> {
    const blueprint = new ArticleSearchBlueprint([this.category]);
    const endDate = new Date();
    const { meta, docs: articles } = await times.search(blueprint, { endDate });
    this.results.push({ meta, articles });
  }

}

const Item : React.SFC<ListProps> = function(props : ListProps) : JSX.Element {
  // Render out our item...
  return <div></div>;
};

export default InfiniteList(Item);
