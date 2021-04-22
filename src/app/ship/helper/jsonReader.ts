import fs from 'fs';
import path from 'path';

export const readJson = (absolutePathToFile: string) => {
    return JSON.parse(fs.readFileSync(path.resolve(absolutePathToFile)).toString());
};
