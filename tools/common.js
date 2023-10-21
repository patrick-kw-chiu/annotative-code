import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Define file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = path.join(__dirname + '/..');
const baseDirectory = path.join(basePath + '/src/annotative');

//
const baseWebComponent = fs.readFileSync(
  baseDirectory + '/annotative-code.ts',
  {
    encoding: 'utf-8',
  },
);
const progLangs = JSON.parse(
  fs.readFileSync(baseDirectory + '/constants/programming-languages.json', {
    encoding: 'utf-8',
  }),
);
const themes = JSON.parse(
  fs.readFileSync(baseDirectory + '/constants/themes.json', {
    encoding: 'utf-8',
  }),
);

export { progLangs, themes, baseWebComponent };
