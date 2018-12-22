/**
 * Created by tushar on 24/06/18
 */

import * as npmName from 'npm-name'
import * as Generator from 'yeoman-generator'
import {IProjectProperties} from './projectProperties'

/**
 * Asks all the questions initially
 */
export const promptQuestions = async (gen: Generator) => {
  const appName = gen.appname.split(' ').join('-')

  return gen.prompt([
    {
      default: appName,
      message: 'Project name',
      name: 'projectName',
      store: true,
      type: 'input',
      validate: async input =>
        npmName(input).then(isAvailable =>
          !isAvailable && input !== appName
            ? `${input} is unavailable on npm`
            : true
        )
    },
    {
      message: 'Describe the project',
      name: 'projectDescription',
      store: true,
      type: 'input'
    },
    {
      message: 'Keywords',
      name: 'keywords',
      store: true,
      type: 'input'
    }
  ]) as Promise<IProjectProperties>
}
