/* eslint-disable no-process-exit */
/*

    Generate Schematic 

*/

import chalk from 'chalk';
import { fstat } from 'fs';
import { SchematicManager } from '../schematic-manager';
import {
  copySceneFile,
  isMotionCanvasProject,
  doesSceneAlreadyExist,
  addSceneImportToMotionCanvasProject,
} from '../utils';

const schematicManager = new SchematicManager();

export function generateScene(
  sceneSchematic: string,
  newSceneName: string
): void {
  console.log(`generateScene: ${sceneSchematic} ${newSceneName}`);

  // TODO There is most likely a better way to do this,
  // But if something like this eventually integrated into the
  // Main MotionCanvas repo then this check could be removed
  if (!isMotionCanvasProject()) {
    // Not in a motion canvas project
    process.exit(1);
  }

  // Check if the sceneSchematic is a valid reference
  if (!schematicManager.isValidSceneSchematic(sceneSchematic)) {
    console.log(chalk.red(`Invalid scene schematic: ${sceneSchematic}`));

    console.log(chalk.red('Valid scene schematic options are:'));
    schematicManager.listScenes(false);

    process.exit(1);
  }

  // Check if there is already a scene name in the motion canvas project
  // TODO Maked sure the scene name does not have spaces/-/make sure to URL sanatize it
  // if the scene name already exists, ask if the user wants to overwrite it
  if (doesSceneAlreadyExist(newSceneName)) {
    console.log('generate doesSceneAlreadyExist returned true');
  }

  /*
    Steps required for auto adding a new scene 

    - The scene name will be the name of the files that are crated
    - Possible to specify a sub folder under src/scenes
        - If the sub folder does not already exist, create it
    - Copy over the blank/starter template for a blank scene
        - TODO maybe we can create a library of common scene 'layouts'
          that can be used as the scene generation schematics

    # File Operations
    - create a file under scenes
    - Modify the project.ts file to add import and 
    - add the new scene to the scenes array

    Might be cool to dev some sort of how did the file change 
    Visual like diff but on command line

    - Make sure the scene name does not have spaces/-/make sure to URL sanatize it
  */

  const newSceneSchematicFile =
    schematicManager.getSceneSchematicPath(sceneSchematic);

  // Clean up the newSceneName
  // Covert and - to _
  newSceneName = newSceneName.replace(/-/g, '_');

  const newFilePath = copySceneFile(newSceneSchematicFile, newSceneName);

  addSceneImportToMotionCanvasProject(newFilePath, newSceneName);
  // Just add the new file import to the project.ts file, with
}

export function generateSceneList(showSchematicCode: boolean): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  schematicManager.listScenes(showSchematicCode);
}
