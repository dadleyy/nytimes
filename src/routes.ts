import Home from "news/components/home";
import NotFound from "news/components/not-found";

export default [{
  exact: true,
  path: "/news/:category",
  key: "whoa",
  component: Home
}, {
  path: "/*",
  key: "not-found",
  component: NotFound
}];
