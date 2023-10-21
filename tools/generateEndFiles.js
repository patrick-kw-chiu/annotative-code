import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import util from 'util';
import child_process from 'child_process';

import { baseWebComponent, progLangs, themes as _themes } from './common.js';
const themes = [
  'base16',
  ..._themes.filter((theme) => !theme.startsWith('base16-')),
];

// Define file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = path.join(__dirname + '/..');
const baseDirectory = path.join(basePath + '/src/annotative');

// console.log({ baseWebComponent, progLangs });

const exec = util.promisify(child_process.exec);

function hyphenToPascalCase(input) {
  return input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function getThemeStyleFile(theme) {
  return theme === 'base16' ? 'all-base16-styles' : theme;
}

async function main() {
  for (let i = 0; i < progLangs.length; i++) {
    const progLang = progLangs[i];
    const progLangPascalCase = hyphenToPascalCase(progLang);

    console.log(`${i + 1}/${progLangs.length}: create intermediate files`);
    for (let j = 0; j < themes.length; j++) {
      let theme = themes[j];
      const themePascalCase = hyphenToPascalCase(theme);

      let endWebComponent = baseWebComponent
        .replaceAll(
          'import javascript from',
          `import _${progLangPascalCase} from`,
        )
        .replaceAll(
          "hljs.registerLanguage('javascript', javascript);",
          `hljs.registerLanguage('${progLang}', _${progLangPascalCase});`,
        )
        .replaceAll('javascript', progLang)
        .replaceAll('Javascript', `${progLangPascalCase}${themePascalCase}`)
        .replaceAll('a11y-dark', getThemeStyleFile(theme));
      // console.log({ endWebComponent });

      fs.writeFileSync(
        `${baseDirectory}/annotative-${progLang}-${theme}.ts`,
        endWebComponent,
      );
    }

    console.log(`${i + 1}/${progLangs.length}: tsc`);
    try {
      const { stdout } = await exec('npm run build');
      // console.log(stdout);
    } catch (e) {
      const { stderr } = e;
      console.error(stderr);
    }

    console.log(`${i + 1}/${progLangs.length}: remove intermediate files`);
    for (let j = 0; j < themes.length; j++) {
      const theme = themes[j];

      fs.unlinkSync(`${baseDirectory}/annotative-${progLang}-${theme}.ts`);
    }

    console.log(`${i + 1}/${progLangs.length}: completed!\n`);
    // break;
  }
}

main();
