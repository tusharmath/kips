import {execP} from './execP'
import chalk from 'chalk'
import {createRemoteRepository} from './createRemoteRepository'

/**
 * Created by tushar on 25/06/18
 */

import Generator = require('yeoman-generator')
import {UserPrompts} from './promptQuestions'

export const setupGit = async (gen: Generator, p: UserPrompts) => {
  const origin = `git@github.com:${p.githubUsername}/${p.projectName}.git`
  // creating Github Repository
  await createRemoteRepository({
    name: p.projectName as string,
    username: p.githubUsername as string,
    password: p.githubPassword as string,
    description: p.projectDescription,
    otp: () =>
      gen
        .prompt({
          type: 'input',
          name: 'otp',
          message: 'Github two factor code'
        })
        .then(_ => _.otp)
  })

  // initialize local git
  await execP('git init')
  await execP(`git remote add origin ${origin}`)
  return gen.log(chalk.green(`Repository ${origin}`))
}
