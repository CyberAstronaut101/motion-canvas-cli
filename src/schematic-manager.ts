/**
 * SchematicManager
 *
 * Schematic Manager is a class that contains the references to all the schematics
 * and the names that are used to reference them during ths `mc gs` command
 *
 * Scene or Component Schematics are stored in the `schematics` folder and have the extension
 *
 * @class SchematicManager
 *
 */
/// <reference types="node" />
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';

export class SchematicManager {
  // This could be a dynamic way, but
  private sceneSchematics = [
    {
      name: 'empty',
      description: 'Empty Scene',
      path: path.join(__dirname, 'schematics', 'empty.scene.schematic'),
    },
  ];

  /**
   * Creates an instance of SchematicManager.
   * - Get all the files in the ./schematics folder that end with *.schematic
   * - Filter out and create sceneSchematics map with the name of the scene schematic and the absolute path
   * - TODO create component schematics map as well
   */
  constructor() {
    // this.sceneSchematics = new Map();
    // // console.log()
    // // Get all the files in the ./schematics folder, and build the path to them
    // // Schematic files will have the *.schematic TLD extension
    // // Scene schematic files will have *.scene.schematic extension
    // const files = fs.readdirSync(path.join(__dirname));
    // console.log(files);
    // // Filter out the files that are now *.schematic
    // const schematicFiles = files.filter(file => {
    //   return file.endsWith('.schematic');
    // });
    // // From the schematic files, get the scene schematic files that end with *.scene.schematic
    // const sceneSchematicFiles = schematicFiles.filter(file => {
    //   return file.endsWith('.scene.schematic');
    // });
    // // For each of the scene schematic files, get the first part of the file name, and use that as the key for the sceneSchematics map where the value is the absolute path fo the file
    // sceneSchematicFiles.forEach(file => {
    //   const key = file.split('.')[0];
    //   const value = path.join(__dirname, file);
    //   this.sceneSchematics.set(key, value);
    // });
    // console.log('SchematicFiles');
    // for (const entry of this.sceneSchematics.entries()) {
    //   console.log(entry);
    // }
  }

  /**
   * If the Scene Schematic sceneName exists in the map, return the absolute path to the file
   * @param sceneName - The name of the scene schematic to get the path of
   * @returns absolute path to the scene template TS file
   */
  getSceneSchematicPath(sceneSchematic: string): string {
    // Attept to .get the sceneName from the sceneSchematics map
    // If the name is not found, throw an error
    if (!this.isValidSceneSchematic(sceneSchematic)) {
      throw new Error(
        `Scene Schematic '${sceneSchematic}' is not a valid schematic.`
      );
    }

    return path.join(
      __dirname,
      'schematics',
      `${sceneSchematic}.scene.schematic`
    );
  }

  /**
   * List all the scene schematics that are available
   * @param showSchematicCode - If true, show the code of the schematic
   */
  listScenes(showSchematicCode = false): void {
    for (const entry of this.sceneSchematics) {
      // Get the content of the entry.path file

      console.log(chalk.blue('====================================='));
      console.log(chalk.blue('Scene Name: ' + chalk.white(entry.name)));
      // console.log(chalk.blue('Scene Path: `' + chalk.white(entry.path) + '`'));

      if (showSchematicCode) {
        fs.readFile(entry.path, 'utf8', (err, data) => {
          if (err) throw err;
          console.log(chalk.blue('Scene Contents:\n'));
          console.log(data);
          console.log(chalk.blue('=====================================\n'));
        });
      } else {
        console.log(chalk.blue('=====================================\n'));
      }
    }
  }

  isValidSceneSchematic(sceneSchematic: string): boolean {
    return this.sceneSchematics.some(
      schematic => schematic.name === sceneSchematic
    );
  }
}
