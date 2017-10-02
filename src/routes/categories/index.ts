export default {
  exact: true,
  path: "/categories",
  key: "categories-index",
  component_module: "news/components/category-list",
  async resolve() : Promise<boolean> {
    return true;
  }
};
