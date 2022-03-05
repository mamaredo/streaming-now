const fs = require('fs')
const path = require('path')
const componentGenerater = require('./generator/component')
const featureGenerater = require('./generator/feature')

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.getParentIndexAction = function (answer, { target, templateFile }) {
    const existsParentIndex = fs.existsSync(
      path.resolve(__dirname, './' + target)
    )
    const action = existsParentIndex
      ? {
          type: 'modify',
          path: target,
          templateFile,
          transform: current => {
            const currentModules = current.trim()
            const camelCaseModule = plop.handlebars.helpers.pascalCase(answer)

            const addedModule = `export * from "./${camelCaseModule}";`
            const updatedModules = currentModules + '\n' + addedModule + '\n'

            return Promise.resolve(updatedModules)
          }
        }
      : {
          type: 'add',
          path: target,
          templateFile
        }

    return action
  }
  componentGenerater('component', plop)
  featureGenerater('feature', plop)
}
