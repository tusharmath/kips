/**
 * Created by tushar on 23/06/18
 */

'use strict'

import * as Generator from 'yeoman-generator'
import {copyTemplateFiles} from './copyTemplateFiles'
import {createPackageJSON} from './createPackageJSON'
import {installPackages} from './installPackages'
import {createDirectories} from './makeDirectories'
import {IUserPrompts, promptQuestions} from './promptQuestions'

export = class extends Generator {
  private props?: IUserPrompts

  /**
   * Phase 3 (configuring)
   */
  public configuring(): void {
    copyTemplateFiles(this, this._getProps())
  }

  /**
   * Phase 6 (conflicts)
   */

  /**
   * Phase 7 (install)
   */
  public install(): void {
    installPackages(this)
  }

  /**
   * Phase 1 (initializing)
   */

  /**
   * Phase 2 (prompting)
   */
  public async prompting(): Promise<void> {
    this.props = await promptQuestions(this)
  }

  /**
   * Phase 4 (default)
   */

  /**
   * Phase 5 (writing)
   */
  public async writing(): Promise<void> {
    createPackageJSON(this, this._getProps())
    await createDirectories(this)
  }
  private _getProps(): IUserPrompts {
    if (!this.props) {
      throw new Error('Project information is missing')
    }

    return this.props
  }

  /**
   * Phase 8 (end)
   */
}
