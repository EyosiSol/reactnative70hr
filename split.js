const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const stylePath = path.join(__dirname, 'style.css');
const scriptPath = path.join(__dirname, 'script.js');

const content = fs.readFileSync(indexPath, 'utf8');

function cleanLines(str) {
  const lines = str.replace(/^\r?\n/, '').replace(/\r?\n\s*$/, '').split(/\r?\n/);
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim().length === 0) continue;
    const match = line.match(/^(\s*)/);
    if (match && match[1].length < minIndent) {
      minIndent = match[1].length;
    }
  }
  if (minIndent === Infinity) minIndent = 0;
  return lines.map(line => line.length >= minIndent ? line.slice(minIndent) : line.trimStart()).join('\n') + '\n';
}

const styleStartTag = '<style>';
const styleEndTag = '</style>';
const scriptStartTag = '<script>';
const scriptEndTag = '</script>';

const styleStartIdx = content.indexOf(styleStartTag);
const styleEndIdx = content.indexOf(styleEndTag);
const scriptStartIdx = content.indexOf(scriptStartTag);
const scriptEndIdx = content.indexOf(scriptEndTag);

if (styleStartIdx === -1 || styleEndIdx === -1 || scriptStartIdx === -1 || scriptEndIdx === -1) {
  console.error('Could not find all required tags in index.html');
  process.exit(1);
}

const rawCss = content.slice(styleStartIdx + styleStartTag.length, styleEndIdx);
const rawJs = content.slice(scriptStartIdx + scriptStartTag.length, scriptEndIdx);

const cleanCss = cleanLines(rawCss);
const cleanJs = cleanLines(rawJs);

fs.writeFileSync(stylePath, cleanCss, 'utf8');
fs.writeFileSync(scriptPath, cleanJs, 'utf8');

// Build the new index.html
const beforeStyle = content.slice(0, styleStartIdx).trimEnd();
const afterStyleBeforeScript = content.slice(styleEndIdx + styleEndTag.length, scriptStartIdx).trimEnd();
const afterScript = content.slice(scriptEndIdx + scriptEndTag.length);

const newIndexHtml = beforeStyle + '\n  <link rel="stylesheet" href="style.css">\n' +
  afterStyleBeforeScript.trimStart() + '\n  <script src="script.js"></script>\n' +
  afterScript.trimStart();

fs.writeFileSync(indexPath, newIndexHtml, 'utf8');

console.log('Successfully split index.html into index.html, style.css, and script.js');

