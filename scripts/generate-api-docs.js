/* eslint-disable no-console */
'use strict';

var fs = require('fs');
var path = require('path');
var ts = require('typescript');

var rootDir = path.resolve(__dirname, '..');
var docsDir = path.join(rootDir, 'docs');
var apiDir = path.join(docsDir, 'api');
var srcDir = path.join(rootDir, 'src');
var normalizedSrcDir = normalizePath(srcDir);
var moduleTitles = {
  'aliases-and-guards.ts': 'Aliases & Type Guards',
  'mapped-types.ts': 'Mapped Types',
  'utility-types.ts': "Flow's Utility Types",
  'functional-helpers.ts': 'Deprecated API',
};
var moduleOrder = [
  'mapped-types.ts',
  'utility-types.ts',
  'aliases-and-guards.ts',
  'functional-helpers.ts',
];

function mkdirp(dir) {
  if (fs.existsSync(dir)) {
    return;
  }
  mkdirp(path.dirname(dir));
  fs.mkdirSync(dir);
}

function writeFile(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function cleanDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  fs.readdirSync(dir).forEach(function(fileName) {
    var filePath = path.join(dir, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      cleanDir(filePath);
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

function readTsConfig() {
  var configPath = path.join(rootDir, 'tsconfig.json');
  var configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
  }
  return ts.parseJsonConfigFileContent(configFile.config, ts.sys, rootDir);
}

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function hasPrivateTag(node) {
  return ts.getJSDocTags(node).some(function(tag) {
    return tag.tagName && tag.tagName.text === 'private';
  });
}

function findPublicDeclaration(declarations) {
  return declarations.filter(function(declaration) {
    var sourceFile = declaration.getSourceFile();
    var normalizedSourceFile = normalizePath(sourceFile.fileName);
    var fileName = path.basename(sourceFile.fileName);

    return (
      normalizedSourceFile.indexOf(normalizedSrcDir) === 0 &&
      fileName !== 'index.ts' &&
      fileName.indexOf('.spec') === -1 &&
      fileName.indexOf('.snap') === -1 &&
      !hasPrivateTag(declaration)
    );
  })[0];
}

function displayPartsToString(parts) {
  if (!parts) {
    return '';
  }
  if (typeof parts === 'string') {
    return parts;
  }
  if (Array.isArray(parts)) {
    return parts
      .map(function(part) {
        return typeof part === 'string' ? part : part.text || '';
      })
      .join('');
  }
  return String(parts);
}

function normalizeNewlines(value) {
  return value.replace(/\r\n?/g, '\n');
}

function getTagText(tag) {
  return normalizeNewlines(displayPartsToString(tag.text)).trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/^\$/, 'dollar-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getModuleSlug(fileName) {
  return fileName.replace(/\.ts$/, '');
}

function stripJsDoc(text) {
  return text.replace(/^\/\*\*[\s\S]*?\*\/\s*/, '');
}

function getDeclarationSnippet(declaration, publicName, checker) {
  if (ts.isVariableDeclaration(declaration)) {
    var type = checker.typeToString(checker.getTypeAtLocation(declaration.name));
    return 'export const ' + publicName + ': ' + type + ';';
  }

  var sourceFile = declaration.getSourceFile();
  var text = declaration.getText(sourceFile);
  var stripped = stripJsDoc(text).trim();

  if (ts.isFunctionDeclaration(declaration) && declaration.body) {
    var bodyStart = declaration.body.getStart(sourceFile);
    var nodeStart = declaration.getStart(sourceFile);
    return stripped.slice(0, bodyStart - nodeStart).trim() + ';';
  }

  return stripped;
}

function getSymbolDocumentation(symbol, checker) {
  var docs = normalizeNewlines(
    displayPartsToString(symbol.getDocumentationComment(checker))
  ).trim();
  var tags = symbol.getJsDocTags(checker);
  var descriptionTags = tags
    .filter(function(tag) {
      return tag.name === 'desc';
    })
    .map(getTagText)
    .filter(Boolean);

  if (descriptionTags.length > 0) {
    return descriptionTags.join('\n\n');
  }

  return docs;
}

function getExamples(symbol, checker) {
  return symbol
    .getJsDocTags(checker)
    .filter(function(tag) {
      return tag.name === 'example';
    })
    .map(getTagText)
    .filter(Boolean);
}

function getNotes(symbol, checker) {
  var skipTags = { desc: true, example: true };

  return symbol
    .getJsDocTags(checker)
    .filter(function(tag) {
      return !skipTags[tag.name];
    })
    .map(function(tag) {
      return {
        name: tag.name,
        text: getTagText(tag),
      };
    })
    .filter(function(tag) {
      return tag.text;
    });
}

function getExports(program, checker) {
  var indexFile = path.join(srcDir, 'index.ts');
  var index = program.getSourceFile(indexFile);
  if (!index) {
    throw new Error('Could not find entry point: ' + indexFile);
  }
  var moduleSymbol = checker.getSymbolAtLocation(index);
  if (!moduleSymbol) {
    throw new Error('Could not read module symbol for entry point: ' + indexFile);
  }

  return checker
    .getExportsOfModule(moduleSymbol)
    .map(function(exportSymbol) {
      var targetSymbol =
        exportSymbol.flags & ts.SymbolFlags.Alias
          ? checker.getAliasedSymbol(exportSymbol)
          : exportSymbol;
      var declarations = targetSymbol.getDeclarations() || [];
      var declaration = findPublicDeclaration(declarations);

      if (!declaration) {
        return null;
      }

      var sourceFile = declaration.getSourceFile();
      var sourceName = path.basename(sourceFile.fileName);
      var publicName = exportSymbol.getName();
      var sourceNameText = targetSymbol.getName();

      return {
        name: publicName,
        sourceName: sourceNameText,
        moduleTitle: moduleTitles[sourceName] || sourceName,
        moduleSlug: getModuleSlug(sourceName),
        fileName: sourceName,
        slug: slugify(publicName),
        documentation: getSymbolDocumentation(targetSymbol, checker),
        examples: getExamples(targetSymbol, checker),
        notes: getNotes(targetSymbol, checker),
        snippet: getDeclarationSnippet(declaration, publicName, checker),
        isAlias: publicName !== sourceNameText,
      };
    })
    .filter(Boolean)
    .sort(function(a, b) {
      if (a.fileName !== b.fileName) {
        return moduleOrder.indexOf(a.fileName) - moduleOrder.indexOf(b.fileName);
      }
      return a.name.localeCompare(b.name);
    });
}

function groupByModule(items) {
  return items.reduce(function(groups, item) {
    if (!groups[item.moduleTitle]) {
      groups[item.moduleTitle] = [];
    }
    groups[item.moduleTitle].push(item);
    return groups;
  }, {});
}

function getOrderedModuleTitles(groups) {
  return moduleOrder
    .map(function(fileName) {
      return moduleTitles[fileName];
    })
    .filter(function(moduleTitle) {
      return groups[moduleTitle] && groups[moduleTitle].length > 0;
    });
}

function renderModulePage(moduleTitle, items) {
  var sourceFile = items[0].fileName;
  var lines = [
    '# ' + moduleTitle,
    '',
    'Generated from `src/' + sourceFile + '`.',
    '',
  ];

  items.forEach(function(item) {
    lines.push('- [`' + item.name + '`](#' + item.slug + ')');
  });
  lines.push('');

  items.forEach(function(item) {
    lines.push('## `' + item.name + '`', '');

    if (item.documentation) {
      lines.push(item.documentation, '');
    }

    if (item.isAlias) {
      lines.push('Source export: `' + item.sourceName + '`', '');
    }

    lines.push('```ts', item.snippet, '```', '');

    if (item.notes.length > 0) {
      lines.push('### Notes', '');
      item.notes.forEach(function(note) {
        lines.push('- `@' + note.name + '` ' + note.text);
      });
      lines.push('');
    }

    if (item.examples.length > 0) {
      lines.push('### Examples', '');
      item.examples.forEach(function(example) {
        lines.push('```ts', example, '```', '');
      });
    }
  });

  return lines.join('\n');
}

function renderReadme(groups) {
  var lines = [
    '# utility-types API',
    '',
    'This documentation is generated from the exported TypeScript declarations and JSDoc comments in `src/`.',
    '',
    'Run `npm run docs:api` after source changes to refresh the pages and sidebar.',
    '',
  ];

  getOrderedModuleTitles(groups).forEach(function(moduleTitle) {
    var items = groups[moduleTitle];
    var exportText = items.length === 1 ? ' export' : ' exports';
    lines.push(
      '- [' +
        moduleTitle +
        '](api/' +
        items[0].moduleSlug +
        '.md) - ' +
        items.length +
        exportText +
        ' from `src/' +
        items[0].fileName +
        '`'
    );
  });
  lines.push('');

  return lines.join('\n');
}

function renderSidebar(groups) {
  var lines = ['- [Overview](README.md)'];

  getOrderedModuleTitles(groups).forEach(function(moduleTitle) {
    var items = groups[moduleTitle];
    lines.push('- [' + moduleTitle + '](api/' + items[0].moduleSlug + '.md)');
  });

  return lines.join('\n') + '\n';
}

function renderIndexHtml() {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>utility-types API</title>',
    '  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">',
    '</head>',
    '<body>',
    '  <div id="app"></div>',
    '  <script>',
    '    window.$docsify = {',
    "      name: 'utility-types',",
    '      loadSidebar: true,',
    '      subMaxLevel: 2,',
    '      search: {',
    "        placeholder: 'Search API',",
    "        noData: 'No results',",
    '      },',
    '    };',
    '  </script>',
    '  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>',
    '  <script src="//cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.min.js"></script>',
    '</body>',
    '</html>',
    '',
  ].join('\n');
}

function main() {
  var parsedConfig = readTsConfig();
  var program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
  var checker = program.getTypeChecker();
  var items = getExports(program, checker);
  var groups = groupByModule(items);

  cleanDir(apiDir);
  mkdirp(apiDir);

  getOrderedModuleTitles(groups).forEach(function(moduleTitle) {
    var moduleItems = groups[moduleTitle];
    writeFile(
      path.join(apiDir, moduleItems[0].moduleSlug + '.md'),
      renderModulePage(moduleTitle, moduleItems)
    );
  });

  writeFile(path.join(docsDir, 'README.md'), renderReadme(groups));
  writeFile(path.join(docsDir, '_sidebar.md'), renderSidebar(groups));
  writeFile(path.join(docsDir, 'index.html'), renderIndexHtml());
  writeFile(path.join(docsDir, '.nojekyll'), '');

  console.log('Generated ' + items.length + ' API entries in docs/.');
}

main();
