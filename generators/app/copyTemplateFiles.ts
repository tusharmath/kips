/**
 * Created by tushar on 25/06/18
 */

import * as Generator from 'yeoman-generator'
import {TEMPLATE_FILES} from './templateFiles'

export const copyTemplateFiles = (
  gen: Generator,
  p: {projectDescription: string; projectName: string}
) => {
  TEMPLATE_FILES.forEach(file => {
    const tmpFile = file
    const outFile = file.replace(/$_/, '')
    gen.fs.copyTpl(gen.templatePath(tmpFile), gen.destinationPath(outFile), {
      projectDescription: p.projectDescription,
      projectName: p.projectName
    })
  })
}
