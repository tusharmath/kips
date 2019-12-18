/**
 * Created by tushar on 24/06/18
 */

import * as fs from 'fs-extra'
import * as path from 'path'

export const TEMPLATE_FILES = fs
  .readdirSync(path.resolve(__dirname, 'templates'))
  .concat(fs.readdirSync(path.resolve(__dirname, 'templates/internal')))
