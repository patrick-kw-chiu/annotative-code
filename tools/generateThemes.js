import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Define file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = path.join(__dirname + '/..');
const inputCssBaseDirectory = path.join(
  basePath + '/node_modules/highlight.js/styles',
);
// const outputThemesDirectory = path.join(
//   basePath + '/src/annotative/styles/themes',
// );
const outputCssDirectory = path.join(basePath + '/src/annotative/highlight.js');
const outputConstantsDirectory = path.join(
  basePath + '/src/annotative/constants',
);

// Define lit style templates
const highlightStylesTemplate = `
import { css } from "lit";
export const highlightStyles = css{{backtickPlaceholder}}
{{cssPlaceholder}}
{{backtickPlaceholder}}
`;

const highlightCssTemplate =
  'const css: string = `{{cssPlaceholder}}`; export { css as default };';

let allStyles = highlightStylesTemplate;
let allBase16Styles = highlightStylesTemplate;

let cssThemeNames = [];

const removeComments = (str) => {
  return str.replace(/\/\*[\s\S]*?\*\//g, '');
};

const saveThemeStyles = (css, cssThemeName) => {
  // if (!fs.existsSync(outputThemesDirectory)) {
  //   fs.mkdirSync(outputThemesDirectory);
  // }

  // fs.writeFileSync(
  //   outputThemesDirectory + '/' + cssThemeName + '.ts',
  //   highlightStylesTemplate
  //     .replace('{{cssPlaceholder}}', css)
  //     .replaceAll('{{cssPlaceholder}}', '')
  //     .replaceAll('`', '"')
  //     .replaceAll('{{backtickPlaceholder}}', '`'),
  // );

  if (!fs.existsSync(outputCssDirectory)) {
    fs.mkdirSync(outputCssDirectory);
  }

  if (!fs.existsSync(outputCssDirectory + '/css')) {
    fs.mkdirSync(outputCssDirectory + '/css');
  }

  fs.writeFileSync(
    outputCssDirectory + '/css/' + cssThemeName + '.ts',
    highlightCssTemplate.replace('{{cssPlaceholder}}', css),
  );
};

const appendAllStyles = (css, type) => {
  if (type === 'all-styles') {
    allStyles = allStyles.replace(
      '{{cssPlaceholder}}',
      `${css}
{{cssPlaceholder}}`,
    );
  } else {
    allBase16Styles = allBase16Styles.replace(
      '{{cssPlaceholder}}',
      `${css}
{{cssPlaceholder}}`,
    );
  }
};

const generateThemes = (baseDirectory = '', fileNamePrefix = '') => {
  // 1. Read `highlight.js` styles
  const fileOrDirNames = fs.readdirSync(baseDirectory);

  for (let i = 0; i < fileOrDirNames.length; i++) {
    const fileOrDirName = fileOrDirNames[i];
    if (fileOrDirName.endsWith('.min.css')) {
      // 2. Only read those ends with .min.css
      const cssFilePath = `${baseDirectory}/${fileOrDirName}`;
      const cssThemeName = `${fileNamePrefix}${fileOrDirName}`.replace(
        '.min.css',
        '',
      );
      console.log({ cssThemeName });
      let css = fs.readFileSync(cssFilePath, {
        encoding: 'utf-8',
      });
      css = removeComments(css);

      // 3. Transform and save as Lit styles format
      saveThemeStyles(css, cssThemeName);

      // 4. Record the available themes we have
      cssThemeNames.push(cssThemeName);

      // 5. Transform and append a full-styles
      css = css.replaceAll('.hljs', `.${cssThemeName} .hljs`);
      appendAllStyles(
        css,
        cssThemeName.startsWith('base16') ? 'base16-styles' : 'all-styles',
      );
    } else if (!fileOrDirName.includes('.')) {
      // If there is sub-directory, `generateThemes` with it
      generateThemes(`${baseDirectory}/${fileOrDirName}`, fileOrDirName + '-');
    }
  }
};

generateThemes(inputCssBaseDirectory);

// Last: Write files
// allStyles = allStyles
//   .replaceAll('{{cssPlaceholder}}', '')
//   .replaceAll('`', '"')
//   .replaceAll('{{backtickPlaceholder}}', '`');

// allBase16Styles = allBase16Styles
//   .replaceAll('{{cssPlaceholder}}', '')
//   .replaceAll('`', '"')
//   .replaceAll('{{backtickPlaceholder}}', '`');

// fs.writeFileSync(outputThemesDirectory + '/all-styles.ts', allStyles);
// fs.writeFileSync(
//   outputThemesDirectory + '/all-base16-styles.ts',
//   allBase16Styles,
// );

fs.writeFileSync(
  outputConstantsDirectory + '/themes.json',
  JSON.stringify(cssThemeNames),
);
