import { RouteComponentProps } from "react-router";
import { Delegate } from "news/components/article-listing";

export default {
  path: "/news/:category",
  key: "categories-single",
  componentModule: "news/components/article-listing",
  async resolve(props : RouteComponentProps<any>) : Promise<any> {
    const { match } = props;
    const { category } = match.params;
    const delegate = new Delegate(category);

    await delegate.load();

    return { delegate };
  }
};
