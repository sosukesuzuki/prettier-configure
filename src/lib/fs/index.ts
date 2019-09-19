import fs from 'fs';
import { promisify } from 'util';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);

const open = promisify(fs.open);
const close = promisify(fs.close);

export async function touch(filePath: string): Promise<void> {
    await close(await open(filePath, 'w'));
}
