/**
 * Created by tushar on 23/06/18
 */

'use strict'

import {createRepository} from './createRepository'
import {execP} from './execP'
import * as fs from 'fs-extra'
import Generator = require('yeoman-generator')
import chalk from 'chalk'
const debug = require('debug')('kips')

const TEMPLATE_FILES = [
  '.gitignore',
  '.npmignore',
  '.travis.yml',
  'tsconfig.json'
]

type UserPrompts = {
  keywords: string[]
  projectDescription: string
  githubUsername: string
  githubPassword: string
  projectName: string
}
export = class extends Generator {
  private _props?: UserPrompts
  private get props() {
    if (!this._props) throw new Error('Input not completed')
    return this._props
  }
  private _getQuestions() {
    return [
      {
        type: 'input',
        name: 'appName',
        message: 'Project name',
        default: this.appname.split(' ').join('-')
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe the project'
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Keywords'
      },
      {
        type: 'input',
        name: 'githubUsername',
        message: 'Github username',
        store: true
      },
      {
        type: 'password',
        name: 'githubPassword',
        message: 'Github password',
        store: false
      }
    ]
  }
  private async _setupGitRepo() {
    const origin = `git@github.com:${this.props.githubUsername}/${
      this.props.projectName
    }.git`
    // creating Github Repository
    await createRepository({
      name: this.props.projectName as string,
      username: this.props.githubUsername as string,
      password: this.props.githubPassword as string,
      description: this.props.projectDescription,
      otp: () =>
        this.prompt({
          type: 'input',
          name: 'otp',
          message: 'Github two factor code'
        }).then(_ => _.otp)
    })
    await execP('git init')
    await execP(`git remote add origin ${origin}`)
    return this.log(chalk.green(`Repository ${origin}`))
  }
  private _getPkgJson() {
    return {
      name: this.props.projectName,
      version: '0.0.0-development',
      description: this.props.projectDescription,
      main: 'index.js',
      scripts: {
        test: 'mocha --require=ts-node/register test/*.ts',
        prepublishOnly: 'tsc -d',
        'semantic-release': 'semantic-release',
        'travis-deploy-once': 'travis-deploy-once',
        prettier:
          "git ls-files | grep '.ts$' | xargs prettier --write --config=.prettierrc"
      },
      author: 'Tushar Mathur <tusharmath@gmail.com>',
      license: 'ISC',
      config: {
        commitizen: {
          path: './node_modules/cz-conventional-changelog'
        }
      },
      repository: {
        type: 'git',
        url: `https://github.com/tusharmath/${this.props.projectName}.git`
      }
    }
  }
  private _projectDependencies() {
    return [
      '@types/mocha',
      '@types/node',
      'cz-conventional-changelog',
      'mocha',
      'semantic-release',
      'travis-deploy-once',
      'ts-node',
      'typescript',
      'prettier'
    ]
  }

  /**
   * Phase 1 (initializing)
   */

  /**
   * Phase 2 (prompting)
   */
  async prompting() {
    debug('start: prompting')
    this._props = (await this.prompt(this._getQuestions())) as UserPrompts
    debug('stop: prompting')
  }

  /**
   * Phase 3 (configuring)
   */
  configuring() {
    debug('start: configuring')
    TEMPLATE_FILES.forEach(file => {
      this.fs.copy(this.templatePath(`_${file}`), this.destinationPath(file))
    })

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      {appname: this.appname, description: this.props.projectDescription}
    )
    debug('stop: configuring')
  }

  /**
   * Phase 4 (default)
   */

  /**
   * Phase 5 (writing)
   */
  async writing() {
    debug('start: writing')
    const pkgJson = this._getPkgJson()

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
    await this._setupGitRepo()
    await fs.mkdir(this.destinationPath('src'))
    await fs.mkdir(this.destinationPath('test'))
    debug('stop: writing')
  }

  /**
   * Phase 6 (conflicts)
   */

  /**
   * Phase 7 (install)
   */
  install() {
    debug('start: install')

    // Poor choice of API where the promise never resolves
    this.yarnInstall(this._projectDependencies(), {dev: true})
    debug('stop: install')
  }

  /**
   * Phase 8 (end)
   */
}
