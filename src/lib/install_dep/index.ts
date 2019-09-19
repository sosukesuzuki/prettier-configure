import execa = require('execa');

const yarn = 'yarn';
const npm = 'npm';

type Manager = typeof yarn | typeof npm;

interface Options {
    manager: Manager;
}

export async function installToDevDeps(
    packages: string[],
    options?: Options,
): Promise<void> {
    const { manager = yarn } = options || {};
    if (manager === yarn) {
        await execa('yarn', ['add', '--dev', ...packages]);
    }
    if (manager === npm) {
        await execa('npm', ['install', '--dev', ...packages]);
    }
}
