import chalk from 'chalk'
import * as Generator from 'yeoman-generator'
import {IProjectProperties} from './projectProperties'

export const TAB_SPACING = 2

export const createPackageJSON = (gen: Generator, p: IProjectProperties) => {
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
    name: `${p.projectName}`,
    repository: {
      type: 'git',
      url: `https://github.com/tusharmath/${p.projectName}.git`
    },
    scripts: {
      lint: 'tslint --project .',
      prepublishOnly: 'tsc -d',
      prettier:
        "git ls-files | grep '.ts$' | xargs prettier --write --config=.prettierrc",
      'semantic-release': 'semantic-release',
      test: 'mocha --require=ts-node/register --watch-extensions ts test/*.ts',
      'travis-deploy-once': 'travis-deploy-once'
    },
    version: '0.0.0-development'
  }

  gen.log(chalk.grey(JSON.stringify(pkgJson, undefined, TAB_SPACING)))
  gen.fs.extendJSON(gen.destinationPath('package.json'), pkgJson)
}
