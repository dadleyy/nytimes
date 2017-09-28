import { RouteComponentProps } from "react-router";
import { Delegate } from "news/components/article-listing";
import { SECTION } from "news/services/times-api";

export interface SingleCategoryRouteProps {
  category : string;
}

export default {
  path: "/news/:category",
  key: "categories-single",
  componentModule: "news/components/category-display",
  async resolve(props : RouteComponentProps<SingleCategoryRouteProps>) : Promise<any> {
    const { match } = props;
    const { category: categoryParam } = match.params;
    const categoryName = SECTION[categoryParam.toUpperCase() as keyof typeof SECTION];

    if(!categoryName) {
      return Promise.reject(new Error("whoa"));
    }

    const delegate = new Delegate(categoryName);
    await delegate.load({ }, true);

    return { delegate };
  }
};
