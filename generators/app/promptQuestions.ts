/**
 * Created by tushar on 24/06/18
 */

import Generator = require('yeoman-generator')

export type UserPrompts = {
  keywords: string
  projectDescription: string
  projectName: string
}

/**
 * Asks all the questions initially
 * @param gen
 */
export const promptQuestions = (gen: Generator) => {
  return gen.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name',
      default: gen.appname.split(' ').join('-')
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: 'Describe the project'
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Keywords'
    }
  ]) as Promise<UserPrompts>
}