import { RouteComponentProps } from "react-router";
import { Delegate } from "news/components/article-listing";
import { SECTION } from "news/services/times-api";
import { RedirectError } from "news/route";

export interface SingleCategoryRouteProps {
  category_slug : string;
}

export default {
  exact: true,
  path: "/news/:category_slug",
  key: "categories-single",
  component_module: "news/components/category-display",
  async resolve(props : RouteComponentProps<SingleCategoryRouteProps>) : Promise<any> {
    const { match } = props;
    const { category_slug } = match.params;
    const category = SECTION[category_slug.toUpperCase() as keyof typeof SECTION];

    if(!category) {
      const e = new RedirectError();

      // Redirect to the root
      return Promise.reject(e);
    }

    const delegate = new Delegate(category);
    await delegate.load({ }, true);

    return { delegate };
  }
};
