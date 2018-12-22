/**
 * Created by tushar on 24/06/18
 */

import * as Generator from 'yeoman-generator'
import {IProjectProperties} from './projectProperties'

/**
 * Asks all the questions initially
 */
export const promptQuestions = async (gen: Generator) =>
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
  ]) as Promise<IProjectProperties>
