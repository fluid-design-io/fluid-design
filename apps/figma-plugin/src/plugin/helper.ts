// source: https://github.com/figma/plugin-samples/blob/master/variables-import-export/code.js

// console.clear();

export function createCollection(name, enableDarkMode = true) {
  const collection = figma.variables.createVariableCollection(name);
  const modeId = collection.modes[0].modeId;
  let darkModeId = null;
  console.log("enableDarkMode", enableDarkMode);
  if (enableDarkMode) {
    collection.renameMode(modeId, "Light");
    try {
      darkModeId = collection.addMode("Dark");
    } catch (error) {
      collection.remove();
      throw error;
    }
  }
  return { collection, modeId, darkModeId, collectionId: collection.id };
}

export function createToken({
  collection,
  modeId,
  darkModeId,
  type,
  name,
  value,
  valueDark = null,
}) {
  const token = figma.variables.createVariable(name, collection.id, type);
  token.setValueForMode(modeId, value);
  if (valueDark !== null && darkModeId !== null) {
    console.log(`adding dark mode token`, name, valueDark);
    token.setValueForMode(darkModeId, valueDark);
  }
  return token;
}

export function createVariable({
  collection,
  modeId,
  darkModeId,
  key,
  valueKey,
  valueKeyDark = null,
  tokens,
}) {
  const token = tokens[valueKey];
  let tokenDark = null;
  if (!!valueKeyDark) {
    tokenDark = tokens[valueKeyDark];
  }
  return createToken({
    collection,
    modeId,
    darkModeId,
    type: token.resolvedType,
    name: key,
    value: {
      type: "VARIABLE_ALIAS",
      id: `${token.id}`,
    },
    valueDark: tokenDark
      ? {
          type: "VARIABLE_ALIAS",
          id: `${tokenDark.id}`,
        }
      : null,
  });
}

export function generateColorVariables({
  fileName,
  body,
  options: { darkMode },
}) {
  const { collection, modeId, darkModeId, collectionId } = createCollection(
    fileName || "Fluid Colors",
    darkMode,
  );
  const aliases = {};
  const tokens = {};
  Object.entries(body).forEach(([key, object]) => {
    traverseToken({
      collection,
      modeId,
      darkModeId,
      type: body.$type,
      key,
      object,
      tokens,
      aliases,
    });
  });
  processAliases({ collection, modeId, darkModeId, aliases, tokens });
  return collectionId;
}

export function processAliases({
  collection,
  modeId,
  darkModeId,
  aliases,
  tokens,
}) {
  aliases = Object.values(aliases);
  let generations = aliases.length;
  while (aliases.length && generations > 0) {
    for (let i = 0; i < aliases.length; i++) {
      const { key, valueKey } = aliases[i];
      const token = tokens[valueKey];
      if (token) {
        aliases.splice(i, 1);
        tokens[key] = createVariable({
          collection,
          modeId,
          darkModeId,
          key,
          valueKey,
          tokens,
        });
      }
    }
    generations--;
  }
}

export function isAlias(value) {
  if (!value) return false;
  return value.toString().trim().charAt(0) === "{";
}

export function traverseToken({
  collection,
  modeId,
  darkModeId,
  type,
  key,
  object,
  tokens,
  aliases,
}) {
  type = type || object.$type;
  // if key is a meta field, move on
  if (key.charAt(0) === "$") {
    return;
  }
  if (
    object.$value !== undefined ||
    (object.$light !== undefined && object.$dark !== undefined)
  ) {
    if (
      isAlias(object.$value) ||
      (isAlias(object.$light) && isAlias(object.$dark))
    ) {
      let valueKey = object.$value || object.$light;
      valueKey = valueKey
        .trim()
        .replace(/\./g, "/")
        .replace(/[\{\}]/g, "");
      let valueKeyDark = object.$dark;
      if (valueKeyDark) {
        valueKeyDark = valueKeyDark
          .trim()
          .replace(/\./g, "/")
          .replace(/[\{\}]/g, "");
      }
      console.log("alias", key, valueKey, valueKeyDark);
      if (tokens[valueKey]) {
        tokens[key] = createVariable({
          collection,
          modeId,
          darkModeId,
          key,
          valueKey,
          valueKeyDark,
          tokens,
        });
      } else {
        aliases[key] = {
          key,
          type,
          valueKey,
        };
      }
    } else if (type === "color") {
      tokens[key] = createToken({
        collection,
        modeId,
        darkModeId,
        type: "COLOR",
        name: key,
        value: parseColor(object.$light),
        valueDark: parseColor(object.$dark),
      });
    } else if (type === "number") {
      tokens[key] = createToken({
        collection,
        modeId,
        darkModeId,
        type: "FLOAT",
        name: key,
        value: object.$value,
        valueDark: object.$value,
      });
    } else {
      console.log("unsupported type", type, object);
    }
  } else {
    Object.entries(object).forEach(([key2, object2]) => {
      if (key2.charAt(0) !== "$") {
        traverseToken({
          collection,
          modeId,
          darkModeId,
          type,
          key: `${key}/${key2}`,
          object: object2,
          tokens,
          aliases,
        });
      }
    });
  }
}

// ! WE ARE NOT USING THIS FUNCTION
export function exportToJSON() {
  const collections = figma.variables.getLocalVariableCollections();
  const files = [];
  collections.forEach((collection) =>
    files.push(...processCollection(collection)),
  );
  figma.ui.postMessage({ type: "EXPORT_RESULT", files });
}

// ! WE ARE NOT USING THIS FUNCTION, NEEDS TO BE UPDATED TO REFLECT LIGHT/DARK MODES FOR COLORS
export function processCollection({ name, modes, variableIds }) {
  const files = [];
  modes.forEach((mode) => {
    const file = { fileName: `${name}.${mode.name}.tokens.json`, body: {} };
    variableIds.forEach((variableId) => {
      const { name, resolvedType, valuesByMode } =
        figma.variables.getVariableById(variableId);
      const value = valuesByMode[mode.modeId] as any;
      if (value !== undefined && ["COLOR", "FLOAT"].includes(resolvedType)) {
        let obj = file.body as any;
        name.split("/").forEach((groupName) => {
          obj[groupName] = obj[groupName] || {};
          obj = obj[groupName];
        });
        obj.$type = resolvedType === "COLOR" ? "color" : "number";
        if (value.type === "VARIABLE_ALIAS") {
          obj.$value = `{${figma.variables
            .getVariableById(value.id)
            .name.replace(/\//g, ".")}}`;
        } else {
          obj.$value = resolvedType === "COLOR" ? rgbToHex(value) : value;
        }
      }
    });
    files.push(file);
  });
  return files;
}

export function rgbToHex({ r, g, b, a }) {
  if (a !== 1) {
    return `rgba(${[r, g, b]
      .map((n) => Math.round(n * 255))
      .join(", ")}, ${a.toFixed(4)})`;
  }
  const toHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}`;
}

export function parseColor(color) {
  color = color.trim();
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbaRegex =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)$/;
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
  const hslaRegex =
    /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([\d.]+)\s*\)$/;
  const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
  const floatRgbRegex =
    /^\{\s*r:\s*[\d\.]+,\s*g:\s*[\d\.]+,\s*b:\s*[\d\.]+(,\s*opacity:\s*[\d\.]+)?\s*\}$/;

  if (rgbRegex.test(color)) {
    const [, r, g, b] = color.match(rgbRegex);
    return { r: parseInt(r) / 255, g: parseInt(g) / 255, b: parseInt(b) / 255 };
  } else if (rgbaRegex.test(color)) {
    const [, r, g, b, a] = color.match(rgbaRegex);
    return {
      r: parseInt(r) / 255,
      g: parseInt(g) / 255,
      b: parseInt(b) / 255,
      a: parseFloat(a),
    };
  } else if (hslRegex.test(color)) {
    const [, h, s, l] = color.match(hslRegex);
    return hslToRgbFloat(parseInt(h), parseInt(s) / 100, parseInt(l) / 100);
  } else if (hslaRegex.test(color)) {
    const [, h, s, l, a] = color.match(hslaRegex);
    return Object.assign(
      hslToRgbFloat(parseInt(h), parseInt(s) / 100, parseInt(l) / 100),
      { a: parseFloat(a) },
    );
  } else if (hexRegex.test(color)) {
    const hexValue = color.substring(1);
    const expandedHex =
      hexValue.length === 3
        ? hexValue
            .split("")
            .map((char) => char + char)
            .join("")
        : hexValue;
    return {
      r: parseInt(expandedHex.slice(0, 2), 16) / 255,
      g: parseInt(expandedHex.slice(2, 4), 16) / 255,
      b: parseInt(expandedHex.slice(4, 6), 16) / 255,
    };
  } else if (floatRgbRegex.test(color)) {
    return JSON.parse(color);
  } else {
    throw new Error("Invalid color format");
  }
}

export function hslToRgbFloat(h, s, l) {
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0 as any,
    g = 0 as any,
    b = 0 as any;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = r + m;
  g = g + m;
  b = b + m;

  return { r, g, b };
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
export function hslToHex(h, s, l) {
  let { r, g, b } = hslToRgbFloat(h, s, l);
  r = Math.round(r * 255).toString(16);
  g = Math.round(g * 255).toString(16);
  b = Math.round(b * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
