import categories from "news/routes/categories/index";
import category from "news/routes/categories/single";
import notFound from "news/routes/not-found";
import { RouteConfig } from "news/route";

const routes : Array<RouteConfig> = [
  categories,
  category,
  notFound
];

export default routes;
