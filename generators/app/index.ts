/**
 * Created by tushar on 23/06/18
 */

'use strict'

const Generator = require('yeoman-generator')

const TEMPLATE_FILES = [
  '.gitignore',
  '.npmignore',
  '.travis.yml',
  'tsconfig.json'
]

export = class extends Generator {
  private description?: string
  configuring() {
    TEMPLATE_FILES.forEach(file => {
      this.fs.copy(this.templatePath(`_${file}`), this.destinationPath(file))
    })

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      {appname: this.appname, description: this.description}
    )
  }

  async prompting() {
    const {description} = await this.prompt([
      {
        type: 'input',
        name: 'description',
        message: 'Describe the project'
      }
    ])
    this.description = description
  }

  writing() {
    const pkgJson = {
      name: this.appname,
      version: '0.0.0-development',
      description: this.description,
      main: 'index.js',
      scripts: {
        test: 'mocha --require=ts-node/register test/*.ts',
        prepublishOnly: 'tsc -d',
        'semantic-release': 'semantic-release',
        'travis-deploy-once': 'travis-deploy-once'
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
        url: `https://github.com/tusharmath/${this.appname}.git`
      }
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
  }

  async install() {
    await this.yarnInstall(
      [
        '@types/mocha',
        '@types/node',
        'cz-conventional-changelog',
        'mocha',
        'semantic-release',
        'travis-deploy-once',
        'ts-node',
        'typescript'
      ],
      {
        'save-dev': true
      }
    )
  }
}
