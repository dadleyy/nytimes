import home from "news/routes/home";
import categories from "news/routes/categories/index";
import category from "news/routes/categories/single";
import article from "news/routes/articles/single";
import search from "news/routes/search";
import notFound from "news/routes/not-found";
import { RouteConfig } from "news/route";

const routes : Array<RouteConfig> = [
  home,
  search,
  article,
  categories,
  category,
  notFound
];

export default routes;
