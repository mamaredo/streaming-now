const componentGenerater = require('./generator/component')
const featureGenerater = require('./generator/feature')

module.exports = function (plop) {
  /** @type {import('plop').NodePlopAPI} */
  plop.setGenerator('component', componentGenerater)
  plop.setGenerator('features', featureGenerater)
}
