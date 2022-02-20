const path = require('path')
const fs = require('fs')

const existElementsIndexFile = () => {
  return fs.existsSync(
    path.resolve(__dirname, '../../src/components/Elements/index.ts')
  )
}

module.exports = {
  description: 'src/components/*',
  prompts: [
    {
      type: 'list',
      name: 'choice',
      message: 'どこにコンポーネントを作成しますか？',
      choices: ['components/*', 'components/Elements/*']
    },
    {
      type: 'input',
      name: 'compoent',
      message: 'pascalCase component name'
    }
  ],
  actions: ({ choice }) => {
    const actions = []
    if (choice === 'components/*') {
      actions.push(
        {
          type: 'add',
          path: 'src/components/{{pascalCase compoent}}/{{pascalCase compoent}}.tsx',
          templateFile: 'generator/component/Component.tsx.hbs'
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase compoent}}/index.ts',
          templateFile: 'generator/component/index.ts.hbs'
        }
      )

      return actions
    }

    if (choice === 'components/Elements/*') {
      actions.push(
        {
          type: 'add',
          path: 'src/components/Elements/{{pascalCase compoent}}/index.ts',
          templateFile: 'generator/component/index.ts.hbs'
        },
        {
          type: 'add',
          path: 'src/components/Elements/{{pascalCase compoent}}/{{pascalCase compoent}}.tsx',
          templateFile: 'generator/component/Component.tsx.hbs'
        }
      )

      existElementsIndexFile()
        ? actions.push({
            type: 'modify',
            path: 'src/components/Elements/index.ts',
            templateFile: 'generator/component/index.ts.hbs',
            transform: (current, { compoent }) => {
              const currentModules = current.trim()
              const createReExportModulePath = moduleName =>
                `export * from './${moduleName}'`
              const addedModules =
                currentModules +
                '\n' +
                createReExportModulePath(compoent) +
                '\n'

              return Promise.resolve(addedModules)
            }
          })
        : actions.push({
            type: 'add',
            path: 'src/components/Elements/index.ts',
            templateFile: 'generator/component/index.ts.hbs'
          })

      return actions
    }
  }
}
