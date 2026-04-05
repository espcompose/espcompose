import * as fs from 'fs';
import * as path from 'path';
import Handlebars from 'handlebars';

export interface InitOptions {
  board?: string;
  library?: boolean;
}

/**
 * Recursively walk a directory and return all file paths relative to it.
 */
function walkDir(dir: string, prefix = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const rel = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(path.join(dir, entry.name), rel));
    } else {
      files.push(rel);
    }
  }
  return files;
}

/**
 * Scaffold a new ESPHome Compose project in `<cwd>/<name>/`.
 *
 * Reads template files from the `templates/` folder shipped with the package,
 * processes `.hbs` files through Handlebars for token replacement, and writes
 * the result to the target directory.
 */
export function initProject(name: string, options: InitOptions = {}): void {
  const board = options.board ?? 'esp32dev';
  const isLibrary = options.library ?? false;
  const targetDir = path.resolve(name);

  if (fs.existsSync(targetDir)) {
    const entries = fs.readdirSync(targetDir);
    if (entries.length > 0) {
      throw new Error(`Directory "${name}" already exists and is not empty.`);
    }
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const variant = isLibrary ? 'library' : 'device';
  // In the compiled bundle __dirname is dist/ (one level from package root);
  // under vitest it is src/commands/init/ (three levels from package root).
  const prodPath = path.resolve(__dirname, '..', 'templates', variant);
  const devPath  = path.resolve(__dirname, '..', '..', '..', 'templates', variant);
  const templateDir = fs.existsSync(prodPath) ? prodPath : devPath;
  const context = { name, board };

  for (const relPath of walkDir(templateDir)) {
    const srcFile = path.join(templateDir, relPath);
    const content = fs.readFileSync(srcFile, 'utf8');

    // Determine output filename:
    //   - Strip .hbs extension and compile through Handlebars
    //   - Rename dot. prefix → . (npm strips dotfiles like .gitignore during publish)
    let outRelPath = relPath;
    let outContent = content;

    if (relPath.endsWith('.hbs')) {
      outRelPath = relPath.slice(0, -4);
      outContent = Handlebars.compile(content, { noEscape: true })(context);
    }

    outRelPath = outRelPath.replace(/(^|\/)dot\./g, '$1.');

    const outFile = path.join(targetDir, outRelPath);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, outContent);
  }

  console.log(`✓ Created ${isLibrary ? 'library' : 'project'} "${name}" in ./${name}/\n`);
  console.log('Next steps:');
  console.log(`  cd ${name}`);
  console.log('  npm install');
  if (isLibrary) {
    console.log('  npx espcompose build --library');
  } else {
    console.log('  npx espcompose transpile');
  }
}
