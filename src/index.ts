import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import ora from 'ora';
import { get as emoji } from 'node-emoji';

const sparkles = emoji('sparkles');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const open = promisify(fs.open);
const close = promisify(fs.close);

const pwd = process.cwd();
const pkgJsonPath = path.join(pwd, 'package.json');

async function touch(filePath: string): Promise<void> {
    await close(await open(filePath, 'w'));
}

async function installToDevDependencies(...packages: string[]) {
    await execa('yarn', ['add', '--dev', ...packages]);
}

async function setUpPackageJson() {
    const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf8'));
    pkgJson.scripts = {
        format: 'prettier --write "**/*.{js,jsx,ts,tsx,md,json,yaml,html}"',
    };
    pkgJson.husky = {
        hooks: {
            'pre-commit': 'pretty-quick --staged',
        },
    };
    const pkgJsonString = JSON.stringify(pkgJson, null, 4);
    await writeFile(pkgJsonPath, pkgJsonString);
}

async function setUpConfigFiles() {
    const prettierrcPath = path.join(pwd, '.prettierrc.yaml');
    await touch(prettierrcPath);
    await writeFile(
        prettierrcPath,
        `trailingComma: 'all'
singleQuote: true
tabWidth: 4
`,
    );

    const prettierIgnorePath = path.join(pwd, '.prettierignore');
    await touch(prettierIgnorePath);
    await writeFile(
        prettierIgnorePath,
        `/node_modules
package.json
`,
    );
}

export async function run(): Promise<void> {
    const spinar = ora('setting up...').start();
    await Promise.all([
        await installToDevDependencies('prettier', 'husky', 'pretty-quick'),
        await setUpPackageJson(),
        await setUpConfigFiles(),
    ]);
    spinar.stop();

    console.log(sparkles, ' Done');
}
