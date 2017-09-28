import * as React from "react";
import times, { ArticleResult, TimesMeta, ArticleSearchBlueprint, SECTION } from "news/services/times-api";
import InfiniteList, { ListProps, ListItemProps, DataResults, LoadParams } from "news/components/hoc/infinite-list";

interface ResultHistoryItem {
  items : Array<ArticleResult>;
  meta : TimesMeta;
}

export class Delegate {
  private results : Array<ResultHistoryItem> = [];
  private category : SECTION;
  private cache : Array<ResultHistoryItem> = [];
  private lastEndDate : Date | null = null;

  constructor(category : SECTION) {
    this.category = category;
  }

  async load(params : LoadParams, cacheResult? : boolean) : Promise<DataResults> {
    const { cache } = this;

    if (cache.length >= 1) {
      const [latest] = cache;
      cache.length = 0;

      // If we had a cached item, return it.
      return latest;
    }

    const blueprint = new ArticleSearchBlueprint([this.category]);
    const endDate = new Date();
    const { meta, docs: items } = await times.search(blueprint, { endDate });

    this.results.push({ meta, items });

    if(cacheResult === true) {
      this.cache.push({ meta, items });
    }

    this.lastEndDate = endDate;

    return { meta, items };
  }

}

export type ItemProps = ListItemProps<ArticleResult>;

const Item : React.SFC<ItemProps> = function(props : ItemProps) : JSX.Element {
  const { item } = props;

  // Render out our item...
  return (
    <article className="margin-bottom-10 shadow-2 flex">
      <aside className="flex-item-1">
      </aside>
      <main className="flex-item-10 padding-tb-10">
        <p>{item.headline.main}</p>
      </main>
    </article>
  );
};

export default InfiniteList(Item);
