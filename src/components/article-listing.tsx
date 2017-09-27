import * as React from "react";
import times, { ArticleSearchBlueprint, SECTION } from "news/services/times-api";
import InfiniteList, { ListProps } from "news/components/hoc/infinite-list";

export class Delegate {
  private category : SECTION;

  constructor(category : SECTION) {
    this.category = category;
  }

  async load() {
    const blueprint = new ArticleSearchBlueprint([this.category]);
    const endDate = new Date();
    const { meta, docs } = await times.search(blueprint, { endDate });
    console.log(meta);
  }

}

const Item : React.SFC<ListProps> = function(props : ListProps) : JSX.Element {
  console.log(props.delegate);
  return <div></div>;
};

export default InfiniteList(Item);
