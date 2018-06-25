import Generator = require('yeoman-generator')

type PackageParams = {
  keywords: string
  projectName: string
  projectDescription: string
}

export const createPackageJSON = (gen: Generator, p: PackageParams) => {
  const pkgJson = {
    name: p.projectName,
    version: '0.0.0-development',
    description: p.projectDescription,
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
    keywords: p.keywords.split(' '),
    repository: {
      type: 'git',
      url: `https://github.com/tusharmath/${p.projectName}.git`
    }
  }

  gen.fs.extendJSON(gen.destinationPath('package.json'), pkgJson)
}
