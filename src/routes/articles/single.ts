import { RouteComponentProps } from "react-router";
import times, { ArticleResult, ArticleSearchBlueprint } from "news/services/times-api";
import { RedirectError } from "news/route";

export interface SingleArticleRouteProps {
  article_id : string;
}

export default {
  exact: true,
  path: "/articles/:article_id",
  key: "single-article",
  component_module: "news/components/article-display",
  async resolve(props : RouteComponentProps<SingleArticleRouteProps>) : Promise<{ article : ArticleResult } | Error> {
    const { match } = props;
    const { article_id } = match.params;

    try {
      const { docs } = await times.search(new ArticleSearchBlueprint({ article_id }));
      const [article] = docs;

      return { article };
    } catch(e) {
      return new RedirectError();
    }
  }
};
