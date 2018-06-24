/**
 * Created by tushar on 24/06/18
 */

import {exec} from 'child_process'
import {promisify} from 'util'

export const execP = (command: string) => {
  return promisify(exec)(command)
}
