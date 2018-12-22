import chalk from 'chalk'
import * as Generator from 'yeoman-generator'

interface IPackageParams {
  keywords: string
  projectDescription: string
  projectName: string
}

export const TAB_SPACING = 2

export const createPackageJSON = (gen: Generator, p: IPackageParams) => {
  const pkgJson = {
    author: 'Tushar Mathur <tusharmath@gmail.com>',
    config: {
      commitizen: {
        path: './node_modules/cz-conventional-changelog'
      }
    },
    description: p.projectDescription,
    keywords: p.keywords.split(' '),
    license: 'ISC',
    main: 'index.js',
    name: p.projectName,
    repository: {
      type: 'git',
      url: `https://github.com/tusharmath/${p.projectName}.git`
    },
    scripts: {
      prepublishOnly: 'tsc -d',
      prettier:
        "git ls-files | grep '.ts$' | xargs prettier --write --config=.prettierrc",
      test: 'mocha --require=ts-node/register test/*.ts',

      'semantic-release': 'semantic-release',
      'travis-deploy-once': 'travis-deploy-once'
    },
    version: '0.0.0-development'
  }

  gen.log(chalk.grey(JSON.stringify(pkgJson, undefined, TAB_SPACING)))
  gen.fs.extendJSON(gen.destinationPath('package.json'), pkgJson)
}
