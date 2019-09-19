import path from 'path';
import execa from 'execa';
import ora from 'ora';
import { get as emoji } from 'node-emoji';
import { writeFile, touch } from './lib/fs';
import { writePkgJson } from './lib/write_pkg_json';

const sparkles = emoji('sparkles');

const pwd = process.cwd();

async function installToDevDependencies(...packages: string[]) {
    await execa('yarn', ['add', '--dev', ...packages]);
}

async function setUpPackageJson() {
    await writePkgJson({
        scripts: {
            format: 'prettier --write "**/*.{js,jsx,ts,tsx,md,json,yaml,html}"',
        },
        husky: {
            hooks: {
                'pre-commit': 'pretty-quick --staged',
            },
        },
    });
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
