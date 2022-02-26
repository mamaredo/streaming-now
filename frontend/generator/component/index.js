module.exports = function (
  name = 'components',
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator(name, {
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
        name: 'component',
        message: 'pascalCase component name'
      }
    ],
    actions: ({ choice, component }) => {
      const actions = []
      if (choice === 'components/*') {
        actions.push(
          {
            type: 'add',
            path: 'src/components/{{pascalCase component}}/{{pascalCase component}}.tsx',
            templateFile: 'generator/component/Component.tsx.hbs'
          },
          {
            type: 'add',
            path: 'src/components/{{pascalCase component}}/index.ts',
            templateFile: 'generator/component/index.ts.hbs'
          }
        )

        return actions
      }

      if (choice === 'components/Elements/*') {
        actions.push(
          {
            type: 'add',
            path: 'src/componentss/Elements/{{pascalCase component}}/index.ts',
            templateFile: 'generator/component/index.ts.hbs'
          },
          {
            type: 'add',
            path: 'src/componentss/Elements/{{pascalCase component}}/{{pascalCase component}}.tsx',
            templateFile: 'generator/component/Component.tsx.hbs'
          },
          plop.getParentIndexAction(component, {
            target: 'src/componentss/Elements/index.ts',
            templateFile: 'generator/component/index.ts.hbs'
          })
        )

        return actions
      }
    }
  })
}
