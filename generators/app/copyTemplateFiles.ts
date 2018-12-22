/**
 * Created by tushar on 25/06/18
 */

import {TEMPLATE_FILES} from './templateFiles'
import Generator = require('yeoman-generator')

export const copyTemplateFiles = (
  gen: Generator,
  p: {projectName: string; projectDescription: string}
) => {
  TEMPLATE_FILES.forEach(file => {
    const tmpFile = file
    const outFile = file.replace(/$_/, '')
    gen.fs.copyTpl(gen.templatePath(tmpFile), gen.destinationPath(outFile), {
      projectName: p.projectName,
      projectDescription: p.projectDescription
    })
  })
}
