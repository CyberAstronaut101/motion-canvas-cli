/* eslint-disable @typescript-eslint/no-unsafe-call */

/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';

/**
 * Checks if from the current context there exists a `src/project.ts` file
 * 
 * TODO maybe there is a better way to infer this. Mainly to prevent the user from running the command in a non-motion-canvas project (eg global)
 * @returns {boolean} - Returns true if this is a Motion Canvas Project
 */
export function isMotionCanvasProject(): boolean {
  // process.stdout.write(chalk.blue('Checking'));
  // console.log(chalk.blue('Checking if this is a Motion Canvas Project'));

  console.log(
    '%s',
    chalk.blue('Checking if in current Motion Canvas Project... ')
  );

  const motionCanvasProjectFile = path.join(process.cwd(), 'src', 'project.ts');

  // throw new Error('This is not a Motion Canvas Project');

  if (fs.existsSync(motionCanvasProjectFile)) {
    console.log('%s', chalk.green('\tPASS'));
    return true;
  } else {
    // Not a Motion Canvas Project
    console.log(chalk.red('FAILED'));
    return false;
  }



}
