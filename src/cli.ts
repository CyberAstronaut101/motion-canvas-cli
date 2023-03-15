/* eslint-disable no-process-exit */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Command } from 'commander';
import { generateScene, generateSceneList } from './commands/generate';
// import { isMotionCanvasProject } from './utils';

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const packageJson = require('../package.json');
const version: string = packageJson.version;

const program = new Command();

// Top Level CLI Info
program
  .name('mc')
  .description(
    'Motion Canvas CLI to help manage projects, scenes, and component file creation'
  )
  .version(version);

// Spice up Help display
program.addHelpText(
  'beforeAll',
  `${chalk.red(
    figlet.textSync('Motion Canvas CLI', { horizontalLayout: 'default' })
  )}
${chalk.blue('Version ' + version)}`
);

/*========== Add Commands  ==========*/

program
  .command('scenes')
  .description(
    'Lists current list of scene schematics available to generate new scenes from'
  )
  .option(
    '-c, --code',
    'Adds the code for the scene to the listing output',
    false
  )
  .action(({ code }) => {
    generateSceneList(code);
  });

program
  .command('add-scene')
  .argument('<sceneSchematic>', 'Name of the scene schematic to use')
  .argument('<sceneName>', 'Name of the newly added schematic to project')
  .description('Adds a new schematic to the project')
  .option(
    '--dry-run',
    'Runs through schematic generation and reports file changes that would occur',
    false
  )
  .action((sceneSchematic: string, sceneName: string) => {
    generateScene(sceneSchematic, sceneName);
  });

program.parse();
