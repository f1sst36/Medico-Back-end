import fs from 'fs';
import path from 'path';

export const readJson = (absolutePathToFile: string) => {
    return fs
        .readFileSync(path.resolve(absolutePathToFile))
        .toString()
        .split(/(?={")/)
        .map((x) => JSON.parse(x))[0];
};
