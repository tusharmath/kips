import * as fs from 'fs-extra'

/**
 * Created by tushar on 25/06/18
 */

import Generator = require('yeoman-generator')

export async function createDirectories(gen: Generator) {
  await fs.mkdir(gen.destinationPath('src'))
  await fs.mkdir(gen.destinationPath('test'))
}
