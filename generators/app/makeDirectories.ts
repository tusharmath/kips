import * as fs from 'fs-extra'

/**
 * Created by tushar on 25/06/18
 */

import * as Generator from 'yeoman-generator'

export const createDirectories = async (gen: Generator) => {
  await fs.mkdir(gen.destinationPath('src'))
  await fs.mkdir(gen.destinationPath('test'))
}
