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
    gen.fs.copy(gen.templatePath(`_${file}`), gen.destinationPath(file))
  })

  gen.fs.copyTpl(
    gen.templatePath('_README.md'),
    gen.destinationPath('README.md'),
    {projectName: p.projectName, projectDescription: p.projectDescription}
  )
}
