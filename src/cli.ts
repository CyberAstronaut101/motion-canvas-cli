/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Command } from 'commander';

import { isMotionCanvasProject } from './utils';

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const fs = require('fs');

const packageJson = require('../package.json');
const version: string = packageJson.version;

clear();
console.log(chalk.red(figlet.textSync('MC CLI', { horizontalLayout: 'full' })));

// Ensure that the command is running within a motion-canvas project
// - Check if the project.ts file exists in the src folder
// - If it does not exist, then exit the program
// - If it does exist, then continue with the command

// See if there is a project.ts file in the src folder in the directory this command is bring run from
isMotionCanvasProject();

// clear();
// console.log(chalk.red(figlet.textSync('MC CLI', { horizontalLayout: 'full' })));

const program = new Command();

// Top Level CLI Info
program
  .name('mc')
  .description(
    'Motion Canvas CLI to help manage projects, scenes, and component file creation'
  )
  // .option('-d, --debug', 'enables verbose logging', false)
  .version(version);

// Precursor checks
// - Make sure that we are in a motion-canvas project

// add a condition Make sure that src/project.ts exists

/*========== Add Commands  ==========*/

program
  .command('generate')
  .alias('g')
  .description('Generates files based on a schematic')
  .argument('<schematic>', 'Schematic to generate')
  .action((arg: string) => {
    require('./commands/generate')(arg);
  });

program.command('test').description('test-command');

// Function code for CLI goes here
//

// const options = program.opts();
// console.log(options)


/*========== Pre-Run Checks  ==========*/
// program.before(() => {
//   console.log('Before');
// });

program.parse();
