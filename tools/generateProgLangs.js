import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Define file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = path.join(__dirname + '/..');
const inputProgLangBaseDirectory = path.join(
  basePath + '/node_modules/highlight.js/es/languages',
);
const outputConstantsDirectory = path.join(
  basePath + '/src/annotative/constants',
);
const outputProgLangsDirectory = path.join(
  basePath + '/src/annotative/highlight.js',
);

// Get programming languagues
let progLangs = fs.readdirSync(inputProgLangBaseDirectory);
progLangs = progLangs
  .filter((progLang) => !progLang.endsWith('.js.js'))
  .map((progLang) => progLang.substring(0, progLang.length - 3));

fs.writeFileSync(
  outputConstantsDirectory + '/programming-languages.json',
  JSON.stringify(progLangs),
);

const copyProgLangs = () => {
  for (let i = 0; i < progLangs.length; i++) {
    const progLang = progLangs[i];
    console.log({ progLang });

    let js = fs.readFileSync(`${inputProgLangBaseDirectory}/${progLang}.js`, {
      encoding: 'utf-8',
    });

    if (!fs.existsSync(outputProgLangsDirectory)) {
      fs.mkdirSync(outputProgLangsDirectory);
    }

    if (!fs.existsSync(outputProgLangsDirectory + '/languages')) {
      fs.mkdirSync(outputProgLangsDirectory + '/languages');
    }

    const _js = js
      .replaceAll('(_hljs) {', '(_hljs: HLJSApi): Language {')
      .replaceAll('(hljs) {', '(hljs: HLJSApi): Language {');

    fs.writeFileSync(
      outputProgLangsDirectory + '/languages/' + progLang + '.ts',
      `import { HLJSApi, Language } from 'highlight.js';

${_js}`,
    );
  }
};

copyProgLangs();
