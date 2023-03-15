/* eslint-disable no-process-exit */
/*

    Generate Schematic 

*/

import { copySchematicFile } from '../utils';

module.exports = function (arg: string) {
  copySchematicFile('empty', 'new_scene_boi');
};
