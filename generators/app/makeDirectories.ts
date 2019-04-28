import * as fs from 'fs-extra'

/**
 * Created by tushar on 25/06/18
 */

import * as Generator from 'yeoman-generator'

const createDirectoryMaker = (G: Generator) => async (path: string) => {
  const gPath = G.destinationPath(path)
  await fs.mkdir(gPath).catch(async <T extends {code: string}>(err: T) => {
    if (err.code === 'EEXIST') {
      const response = await G.prompt([
        {
          type: 'confirm',

          default: false,
          message: `Path "${path}" already exists, delete and retry`,
          name: 'confirm'
        }
      ])
      if (response.confirm) {
        await fs.rmdir(path)
        await createDirectoryMaker(G)(path)
      }
    } else {
      throw err
    }
  })
}

export const createDirectories = async (G: Generator) => {
  const mkDir = createDirectoryMaker(G)
  await mkDir('src')
  await mkDir('test')
  await mkDir('src/internals')
}
