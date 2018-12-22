/**
 * Created by tushar on 23/06/18
 */

'use strict'

import * as Generator from 'yeoman-generator'
import {copyTemplateFiles} from './copyTemplateFiles'
import {createPackageJSON} from './createPackageJSON'
import {installPackages} from './installPackages'
import {createDirectories} from './makeDirectories'
import {promptQuestions, UserPrompts} from './promptQuestions'

export = class extends Generator {
  private _props?: UserPrompts

  /**
   * Phase 3 (configuring)
   */
  public configuring() {
    copyTemplateFiles(this, this._getProps())
  }

  /**
   * Phase 6 (conflicts)
   */

  /**
   * Phase 7 (install)
   */
  public install() {
    installPackages(this)
  }

  /**
   * Phase 1 (initializing)
   */

  /**
   * Phase 2 (prompting)
   */
  public async prompting(): Promise<void> {
    this._props = await promptQuestions(this)
  }

  /**
   * Phase 4 (default)
   */

  /**
   * Phase 5 (writing)
   */
  public async writing() {
    createPackageJSON(this, this._getProps())
    await createDirectories(this)
  }
  private _getProps(): UserPrompts {
    if (!this._props) { throw new Error('Project information is missing') }
    return this._props
  }

  /**
   * Phase 8 (end)
   */
}
