import home from "news/routes/home";
import categories from "news/routes/categories/index";
import category from "news/routes/categories/single";
import article from "news/routes/articles/single";
import notFound from "news/routes/not-found";
import { RouteConfig } from "news/route";

const routes : Array<RouteConfig> = [
  home,
  article,
  categories,
  category,
  notFound
];

export default routes;
