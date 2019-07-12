/**
 * Created by tushar on 23/06/18
 */

'use strict'

import * as Generator from 'yeoman-generator'

import {copyTemplateFiles} from './copyTemplateFiles'
import {createLogger, ILogger} from './createLogger'
import {createPackageJSON} from './createPackageJSON'
import {installPackages} from './installPackages'
import {createDirectories} from './makeDirectories'
import {IProjectProperties} from './projectProperties'
import {promptQuestions} from './promptQuestions'

export = class extends Generator {
  /**
   * Logger module to help log stuff
   */
  public logger: ILogger = createLogger(this)

  /**
   * User inputted properties of the project being created
   */
  private props?: IProjectProperties

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

  /**
   * Gets the properties if they exist
   */
  private _getProps(): IProjectProperties {
    if (this.props === undefined) {
      throw new Error('Project information is missing')
    }

    return this.props
  }

  /**
   * Phase 8 (end)
   */
}
