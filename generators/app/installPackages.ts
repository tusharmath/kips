/**
 * Created by tushar on 25/06/18
 */

import Generator = require('yeoman-generator')
import chalk from 'chalk'

export const installPackages = (gen: Generator) => {
  gen
    .yarnInstall(
      [
        '@types/mocha',
        '@types/node',
        'cz-conventional-changelog',
        'mocha',
        'semantic-release',
        'travis-deploy-once',
        'ts-node',
        'typescript',
        'prettier'
      ],
      {dev: true}
    )
    .catch(err => gen.log(chalk.red(err)))
}
