/* eslint-disable @typescript-eslint/no-var-requires */

// Run on node.js environment

const fs = require('fs');
const path = require('path');
const tinycolor = require('tinycolor2');
const css = require('css');
const PolynomialRegression = require('polynomial-regression');

function extractColors(cssAst) {
  const grayColorNames = ["slate", "gray", "zinc", "neutral", "stone"]
  const colors = {};
  const grays = {};
  const saturations = {};
  const lightnesses = {};

  cssAst.stylesheet.rules.forEach(rule => {
    if (rule.type === 'rule') {
      rule.declarations.forEach(declaration => {
        if (/^--/.test(declaration.property)) {
          const [_, colorGroup, colorKey] = declaration.property.slice(2).match(/([a-zA-Z]+)-(\d+)/);
          const colorValue = tinycolor(declaration.value).toHslString();
          if (grayColorNames.includes(colorGroup)) { // if colorGroup is in grayColorNames
            if (!grays[colorGroup]) {
              grays[colorGroup] = {};
            }
            grays[colorGroup][colorKey] = colorValue;
          } else {
            if (!colors[colorGroup]) {
              colors[colorGroup] = {};
              saturations[colorGroup] = {};
              lightnesses[colorGroup] = {};
            }
            colors[colorGroup][colorKey] = colorValue;
            const hsl = tinycolor(colorValue).toHsl();
            saturations[colorGroup][colorKey] = Math.round(hsl.s * 100)
            lightnesses[colorGroup][colorKey] = Math.round(hsl.l * 100)
          }
        }
      });
    }
  });

  return { colors, grays, saturations, lightnesses };
}

function extractMinMaxAvgHues(colors) {
  const hues = {};
  Object.keys(colors).forEach(colorGroup => {
    const colorGroupHues = Object.values(colors[colorGroup]).map(color => tinycolor(color).toHsl().h);
    hues[colorGroup] = {
      min: Math.round(Math.min(...colorGroupHues)),
      max: Math.round(Math.max(...colorGroupHues)),
      avg: Math.round(colorGroupHues.reduce((a, b) => a + b, 0) / colorGroupHues.length),
    };
  }
  );
  return { hues };
}



function generateColorPolynomials(colorValues) {
  const degree = 8; // change this to adjust polynomial degree
  const results = {};

  for (const [color, values] of Object.entries(colorValues)) {
    const x = Object.keys(values).map(Number);
    const y = Object.values(values);

    const polyReg = new PolynomialRegression(x, y, degree);
    const coeffs = polyReg.getCoefficients();
    const formula = x => {
      let result = 0;
      for (let i = 0; i < coeffs.length; i++) {
        result += coeffs[i] * Math.pow(x, i);
      }
      return result;
    };

    results[color] = { formula };
  }

  return results;
}





function convertColors(inputFile, outputFile) {
  const filePath = path.resolve(process.cwd(), inputFile);
  const cssContent = fs.readFileSync(filePath, 'utf-8');
  const cssAst = css.parse(cssContent);
  const { colors, grays, saturations, lightnesses } = extractColors(cssAst);
  const { hues } = extractMinMaxAvgHues(colors);
  const formulas = {}
  Object.keys(saturations).forEach(colorGroup => {
    const res = generateColorPolynomials(saturations[colorGroup]);
    formulas[colorGroup] = res;
  });
  const colorsContent = `export const colors = ${JSON.stringify(colors, null, 2)};`;
  const graysContent = `export const grays = ${JSON.stringify(grays, null, 2)};`;
  const huesContent = `export const hues = ${JSON.stringify(hues, null, 2)};`;
  const saturationsContent = `export const saturations = ${JSON.stringify(saturations, null, 2)};`;
  const lightnessesContent = `export const lightnesses = ${JSON.stringify(lightnesses, null, 2)};`;
  const formulaContent = `export const formulas = ${JSON.stringify(formulas, null, 2)};`;
  const colorsJsContent = `${colorsContent}\n\n${graysContent}\n\n${huesContent}\n\n${saturationsContent}\n\n${lightnessesContent}\n\n${formulaContent}`;
  const outputPath = path.resolve(process.cwd(), outputFile);
  fs.writeFileSync(outputPath, colorsJsContent, 'utf-8');
}

// Read arguments
const args = process.argv.slice(2);
const inputFile = args.find(arg => arg.startsWith('-i='))?.slice(3);
// -t = typescript, -j = javascript
const outputFile = args.find(arg => arg.startsWith('-o='))?.slice(3) || `colors.${args.find(arg => arg.startsWith('-t')) ? 'ts' : 'js'}`;

if (!inputFile) {
  console.error('Please provide an input file using the -i=<input-file> flag');
  process.exit(1);
}

convertColors(inputFile, outputFile);
console.log(`Colors converted and saved to ${outputFile}`);


