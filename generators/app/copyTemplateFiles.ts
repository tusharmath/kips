/**
 * Created by tushar on 25/06/18
 */

import * as Generator from 'yeoman-generator'
import {IProjectProperties} from './projectProperties'
import {TEMPLATE_FILES} from './templateFiles'

/**
 * Copy template files to the project
 */
export const copyTemplateFiles = (gen: Generator, p: IProjectProperties) => {
  TEMPLATE_FILES.forEach(file => {
    const tmpFile = file
    const outFile = file.replace(/\.ejs$/, '')
    gen.fs.copyTpl(gen.templatePath(tmpFile), gen.destinationPath(outFile), {
      projectDescription: p.projectDescription,
      projectName: p.projectName
    })
  })
}
