import Home from "news/components/home";
import NotFound from "news/components/not-found";

export default [{
  exact: true,
  path: "/whoa",
  key: "whoa",
  component: Home
}, {
  path: "/*",
  key: "not-found",
  component: NotFound
}];
