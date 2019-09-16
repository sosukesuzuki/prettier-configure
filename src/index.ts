import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import ora from 'ora';
import { get as emoji } from 'node-emoji';

const sparkles = emoji('sparkles');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const pkgJsonPath = path.join(process.cwd(), 'package.json');

async function installToDevDependencies(...packages: string[]) {
    await execa('yarn', ['add', '--dev', ...packages]);
}

async function main(): Promise<void> {
    const installingSpinar = ora('Installing packages...').start();
    await installToDevDependencies('prettier', 'husky', 'pretty-quick');
    installingSpinar.stop();

    const writingSpinar = ora('Modifying package.json...').start();

    const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf8'));
    pkgJson.scripts = {
        format: 'prettier --write "**/*.{js,ts,tsx,md,json,yaml,html}"',
    };
    pkgJson.husky = {
        hooks: {
            'pre-commit': 'pretty-quick --staged',
        },
    };
    const pkgJsonString = JSON.stringify(pkgJson, null, 2);
    await writeFile(pkgJsonPath, pkgJsonString);

    writingSpinar.stop();

    console.log(sparkles, ' Done');
}

main();
