/**
 * Created by tushar on 25/06/18
 */

import Generator = require('yeoman-generator')

export const installPackages = (gen: Generator) => {
  gen.yarnInstall(
    [
      '@types/mocha',
      '@types/node',
      'cz-conventional-changelog',
      'mocha',
      'semantic-release',
      'travis-deploy-once',
      'ts-node',
      'typescript',
      'prettier',
      "tslint"
    ],
    {dev: true}
  )
}
