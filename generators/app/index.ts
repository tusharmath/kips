/**
 * Created by tushar on 23/06/18
 */

'use strict'

import {createRepository} from './createRepository'
import {execP} from './execP'
import * as fs from 'fs-extra'
import Generator = require('yeoman-generator')
const debug = require('debug')('kips')

const TEMPLATE_FILES = [
  '.gitignore',
  '.npmignore',
  '.travis.yml',
  'tsconfig.json'
]

export = class extends Generator {
  private projectDescription?: string
  private githubUsername?: string
  private githubPassword?: string
  private projectName?: string
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
        message: 'Describe the project',
        store: true
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
    // creating Github Repository
    await createRepository({
      name: this.projectName as string,
      username: this.githubUsername as string,
      password: this.githubPassword as string,
      description: this.projectDescription,
      otp: () =>
        this.prompt({
          type: 'input',
          name: 'otp',
          message: 'Github two factor code'
        }).then(_ => _.otp)
    })
    await execP('git init')
    await execP(
      `git remote add origin git@github.com:${this.githubUsername}/${
        this.projectName
      }.git`
    )
    return this.log('✔️  Remote repository created')
  }
  private _getPkgJson() {
    return {
      name: this.projectName,
      version: '0.0.0-development',
      description: this.projectDescription,
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
        url: `https://github.com/tusharmath/${this.projectName}.git`
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
    const {
      description,
      githubUsername,
      githubPassword,
      appName
    } = await this.prompt(this._getQuestions())
    this.projectDescription = description
    this.githubUsername = githubUsername
    this.githubPassword = githubPassword
    this.projectName = appName
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
      {appname: this.appname, description: this.projectDescription}
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
    this.yarnInstall(this._projectDependencies(), {dev: true})
    debug('stop: install')
  }

  /**
   * Phase 8 (end)
   */
}
