import chalk from 'chalk'
import * as Generator from 'yeoman-generator'

export interface ILogger {
  error(message: string): (err: Error) => void
  subtle(message: string): void
  title(message: string): void
  warn(message: string): void
}

export const createLogger = (gen: Generator): ILogger => ({
  error: (message: string) => (err: Error) => {
    gen.log(`${chalk.red('ERROR:')} ${message}\n${chalk.gray(err.toString())}`)
  },
  subtle: (message: string) => {
    gen.log(`${chalk.grey(message)}`)
  },
  title: (message: string) => {
    gen.log(`${chalk.bold(message)}`)
  },
  warn: (message: string) => {
    gen.log(`${chalk.yellow('WARN')}: ${message}`)
  }
})
