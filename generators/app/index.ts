/**
 * Created by tushar on 23/06/18
 */

'use strict'

import {promptQuestions, UserPrompts} from './promptQuestions'
import {createPackageJSON} from './createPackageJSON'
import {installPackages} from './installPackages'
import {copyTemplateFiles} from './copyTemplateFiles'
import {createDirectories} from './makeDirectories'
import Generator = require('yeoman-generator')

export = class extends Generator {
  private _props: UserPrompts = {
    keywords: '',
    projectDescription: '',
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
