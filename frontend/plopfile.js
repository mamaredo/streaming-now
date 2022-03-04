const componentGenerater = require('./generator/component')
const featureGenerater = require('./generator/feature')

module.exports = function (plop) {
  /** @type {import('plop').NodePlopAPI} */
  componentGenerater('component', plop)
  featureGenerater('feature', plop)
}
