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
      'create-docs': 'typedoc',
      lint: 'tslint --project .',
      // NOTE: Postinstall script is called even after installation
      // postInstall: 'yarn tsc',
      prepublishOnly: 'tsc -d',
      prettier:
        "git ls-files | grep -E '.*\\.(ts|md|json)$' | xargs prettier --write --config=.prettierrc",
      'semantic-release': 'semantic-release',
      test: 'mocha',
      'travis-deploy-once': 'travis-deploy-once --pro'
    },
    version: '0.0.0-development'
  }

  gen.log(chalk.grey(JSON.stringify(pkgJson, undefined, TAB_SPACING)))
  gen.fs.extendJSON(gen.destinationPath('package.json'), pkgJson)
}
