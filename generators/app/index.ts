/**
 * Created by tushar on 23/06/18
 */

'use strict'

import {createRemoteRepository} from './createRemoteRepository'
import {execP} from './execP'
import chalk from 'chalk'
import {promptQuestions, UserPrompts} from './promptQuestions'
import {createPackageJSON} from './createPackageJSON'
import {installPackages} from './installPackages'
import {copyTemplateFiles} from './copyTemplateFiles'
import Generator = require('yeoman-generator')
import {createDirectories} from './makeDirectories'
import {setupGit} from './setupGit'

export = class extends Generator {
  private _props: UserPrompts = {
    keywords: '',
    projectDescription: '',
    githubUsername: '',
    githubPassword: '',
    projectName: ''
  }

  /**
   * Phase 1 (initializing)
   */

  /**
   * Phase 2 (prompting)
   */
  async prompting(): Promise<void> {
    this._props = await promptQuestions(this)
  }

  /**
   * Phase 3 (configuring)
   */
  configuring() {
    copyTemplateFiles(this, this._props)
  }

  /**
   * Phase 4 (default)
   */

  /**
   * Phase 5 (writing)
   */
  async writing() {
    createPackageJSON(this, this._props)
    await setupGit(this, this._props)
    await createDirectories(this)
  }

  /**
   * Phase 6 (conflicts)
   */

  /**
   * Phase 7 (install)
   */
  install() {
    installPackages(this)
  }

  /**
   * Phase 8 (end)
   */
}
