import detectIndent from 'detect-indent';
import { join } from 'path';
import { readFile, writeFile } from '../fs';

interface Options {
    path?: string;
}

export async function writePkgJson(
    data: object,
    options?: Options,
): Promise<void> {
    const { path = process.cwd() } = options || {};
    const pkgJsonPath = join(path, 'package.json');
    const pkgJsonOriginalString = await readFile(pkgJsonPath, 'utf8');
    const indent = detectIndent(pkgJsonOriginalString).indent;
    const pkgJsonObj = JSON.parse(pkgJsonOriginalString);
    const newPkgJsonObj = {
        ...pkgJsonObj,
        ...data,
    };
    const pkgJsonString = JSON.stringify(newPkgJsonObj, null, indent);
    await writeFile(pkgJsonPath, pkgJsonString);
}
