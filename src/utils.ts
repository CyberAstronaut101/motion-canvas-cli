/* eslint-disable @typescript-eslint/no-unsafe-call */

/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import { SchematicManager } from './schematic-manager';

/**
 * Checks if from the current context there exists a `src/project.ts` file
 *
 * TODO maybe there is a better way to infer this. Mainly to prevent the user from running the command in a non-motion-canvas project (eg global)
 * @returns {boolean} - Returns true if this is a Motion Canvas Project
 */
export function isMotionCanvasProject(): boolean {
  const motionCanvasProjectFile = path.join(process.cwd(), 'src', 'project.ts');

  if (fs.existsSync(motionCanvasProjectFile)) {
    console.log(
      chalk.blue('Is there a ./src/project.js file... ') + chalk.green('YES')
    );
    return true;
  } else {
    // File not found
    console.log(
      chalk.blue('Is there a ./src/project.ts file... ') + chalk.red('NO')
    );

    // Give feedback on fix and path used to check
    console.log(
      chalk.red(
        'Make sure you are running `mc` within the context of a Motion Canvas project'
      )
    );

    console.log(
      chalk.red('Expected to find the file: ' + motionCanvasProjectFile)
    );
    return false;
  }
}

/**
 * Copies a scene schematic file into the motion canvas project
 * @param sceneSchematicPath path to the scene schematic file that will be copied into motion canvas project
 * @param sceneName Name of the scene, used to create the new file name and import into project
 * @returns {string} - Returns the path to the new scene file within the motion canvas project
 */
export function copySceneFile(
  sceneSchematicPath: string,
  sceneName: string
): string {
  const destFile = path.join(
    process.cwd(),
    'src',
    'scenes',
    sceneName + '.tsx'
  );

  fs.copyFileSync(sceneSchematicPath, destFile);

  console.log('Newly created file at: ');
  console.log(destFile);

  return destFile;
}

export function addSceneImportToMotionCanvasProject(
  newFilePath: string,
  newSceneName: string
): void {
  console.log('addSceneImportToMotionCanvasProject');

  // Relative path to the scene file from
  // add add ?scene to the end of the string to import

  // Expecting a semi full path like:
  // /workspaces/motion-canvas-stuff/motion-canvas-projects/docker-presentation/src/scenes/new-empty-scene.tsx

  // split newFilePath at /src/
  let relativePath = newFilePath.split('/src/')[1];
  // cut out and rejoin on .tsx
  relativePath = relativePath.split('.tsx').join('');

  relativePath = './' + relativePath + '?scene';

  // Make the relative path into an import statement

  const importStatement = `import ${newSceneName} from '${relativePath}';`;
  console.log(importStatement);

  addImportToProjectFile(importStatement);
}

/**
 *
 * @param schematicName
 * @param outputName
 */
export function copySchematicFile(
  schematicName: string,
  outputName: string
): void {
  console.log(
    `CopySchematicFile:: SchematicName: ${schematicName} | outputName: ${outputName}`
  );

  const schematicManger = new SchematicManager();
  console.log(
    'SchematicManager.getSceneSchematic: ',
    schematicManger.getSceneSchematicPath('non-existent')
  );
}

/**
 * Checks if a scene already exists in the motion canvas project with given name
 * @param sceneName
 * @returns {boolean} - Returns true if the scene already exists
 */
export function doesSceneAlreadyExist(sceneName: string): boolean {
  console.log('Does Scene Already Exist?');

  const targetScenePath = path.join(
    process.cwd(),
    'src',
    'scenes',
    sceneName + '.tsx'
  );
  console.log(targetScenePath);
  // Test if targetScenePath exists
  if (fs.existsSync(targetScenePath)) {
    console.log(chalk.red(`Scene already exists: ${sceneName}`));

    throw new Error(`Scene already exists: ${sceneName}`);

    // TODO
    // Prompt for user input to overwrite (Y/n) or cancel (N/n)
    // And/or add force flag to overwrite without prompt
  }
  return false;
}

export function addImportToProjectFile(stringToInsert: string): void {
  const motionCanvasProjectFile = path.join(process.cwd(), 'src', 'project.ts');

  fs.readFile(motionCanvasProjectFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const updatedProjectFile = stringToInsert + '\n' + data;

    fs.writeFile(motionCanvasProjectFile, updatedProjectFile, err => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(
        chalk.green(
          'Project.ts file updated with new scene import successfully'
        )
      );
    });
  });
}

/*
const fs = require('fs');

const filePath = 'path/to/file.txt';
const newLine = 'New line to insert';

// Read the existing contents of the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Prepend the new line to the contents of the file
  const updatedData = newLine + '\n' + data;

  // Write the updated contents back to the file
  fs.writeFile(filePath, updatedData, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('New line inserted successfully');
  });
});
*/
