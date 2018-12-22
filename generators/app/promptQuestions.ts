/**
 * Created by tushar on 24/06/18
 */

import * as Generator from 'yeoman-generator'

export interface IUserPrompts {
  keywords: string
  projectDescription: string
  projectName: string
}

/**
 * Asks all the questions initially
 */
export const promptQuestions = (gen: Generator) =>
  gen.prompt([
    {
      default: gen.appname.split(' ').join('-'),
      message: 'Project name',
      name: 'projectName',
      type: 'input'
    },
    {
      message: 'Describe the project',
      name: 'projectDescription',
      type: 'input'
    },
    {
      message: 'Keywords',
      name: 'keywords',
      type: 'input'
    }
  ]) as Promise<IUserPrompts>
