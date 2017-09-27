const MODULE_REGEX = /componentmodule:\s\"([\w//\-\_]+)\"/i

module.exports = function(source) {
  const module = MODULE_REGEX.exec(source);

  if (!module) {
    return source;
  }

  const [, dep] = module;

  this.addDependency(dep);

  return source;
};
