import { RouteComponentProps } from "react-router";
import { Delegate } from "news/components/article-listing";
import { SECTION } from "news/services/times-api";
import { RedirectError } from "news/route";

export interface SingleCategoryRouteProps {
  category_slug : string;
}

export default {
  exact: true,
  path: "/search",
  key: "search",
  component_module: "news/components/search-display",
  async resolve(props : RouteComponentProps<SingleCategoryRouteProps>) : Promise<any> {
    const { location } = props;
    const { search } = location;
    const query = (new URLSearchParams(search)).get("q");
    const delegate = new Delegate(null, query);
    await delegate.load({ }, true);

    return { delegate };
  }
};
