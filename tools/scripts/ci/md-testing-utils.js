const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const _ = require('lodash');

const pass = true;

const guideRoot = path.resolve(__dirname, '../../../guide');
const challengeRoot = path.resolve(__dirname, '../../../curriculum/challenges');
exports.guideRoot = guideRoot;
exports.challengeRoot = challengeRoot;

const allowedLangDirNames = [
  'arabic',
  'chinese',
  'english',
  'portuguese',
  'russian',
  'spanish'
];

exports.checkGuideFile = function checkGuideFile(file) {
  const { stat, depth, name, fullPath } = file;
  if (depth === 1) {
    if (stat.isFile()) {
      throw new Error(`${name} is not valid in the ${guideRoot} directory`);
    }
    if (!allowedLangDirNames.includes(name)) {
      throw new Error(`${name} should not be in the ${guideRoot} directory`);
    }
  }
  if (stat.isDirectory()) {
    return checkDirName(name, fullPath);
  }
  return checkGuideFileName(name, fullPath);
};

function checkDirName(dirName, fullPath) {
  return new Promise((resolve, reject) => {
    if (dirName.replace(/(\s|\_)/, '') !== dirName) {
      return reject(
        new Error(`
    Invalid character found in '${dirName}', please use '-' for spaces

      Found in:
        ${fullPath}
    `)
      );
    }
    if (dirName.toLowerCase() !== dirName) {
      return reject(
        new Error(`
Upper case characters found in ${dirName}, all folder names must be lower case

  Found in :
    ${fullPath}
`)
      );
    }
    return resolve(pass);
  });
}

function checkGuideFileName(fileName, fullPath) {
  return new Promise((resolve, reject) => {
    if (fileName !== 'index.md') {
      return reject(
        new Error(
          `${fileName} is not a valid file name, please use 'index.md'

      Found in:
        ${fullPath}
    `
        )
      );
    }
    return resolve(pass);
  });
}

exports.checkFrontmatter = function checkFrontmatter(
  { fullPath, stat },
  options = {
    validator() {
      return true;
    }
  }
) {
  if (!stat.isFile()) {
    return Promise.resolve(pass);
  }
  return new Promise((resolve, reject) =>
    fs.readFile(fullPath, 'utf8', (err, content) => {
      if (err) {
        return reject(new Error(err));
      }
      try {
        const { data: frontmatter } = matter(content);
        const { validator } = options;
        if (
          !frontmatter ||
          _.isEmpty(frontmatter) ||
          !frontmatter.title ||
          !validator(frontmatter)
        ) {
          return reject(
            new Error(`
  The article at: ${fullPath} is missing frontmatter.

  Example:

  ---
  title: The Article Title
  localeTitle: The Translated Title # Only required for translations
  ---

  < Content >

  `)
          );
        }
        return resolve(pass);
      } catch (e) {
        console.log(`

  The below occured in:

  ${fullPath}

  `);
        throw e;
      }
    })
  );
};

function extractLangFromFileName({ path: relativePath }) {
  return relativePath.split(path.sep)[0];
}

exports.extractLangFromFileName = extractLangFromFileName;
