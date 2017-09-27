export default {
  exact: true,
  path: "/categories",
  key: "categories-index",
  componentModule: "news/components/category-list",
  async resolve() : Promise<boolean> {
    return true;
  }
};
