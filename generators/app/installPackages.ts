/**
 * Created by tushar on 25/06/18
 */

import * as Generator from 'yeoman-generator'

export const installPackages = (gen: Generator) => {
  gen.yarnInstall(
    [
      '@types/chai',
      '@types/chai-spies',
      '@types/mocha',
      '@types/node',
      'chai',
      'chai-spies',
      'cz-conventional-changelog',
      'mocha',
      'prettier',
      'semantic-release',
      'travis-deploy-once',
      'ts-node',
      'tslint-config-prettier',
      'tslint',
      'typedoc',
      'typescript-tslint-plugin',
      'typescript'
    ],
    {dev: true}
  )
}
