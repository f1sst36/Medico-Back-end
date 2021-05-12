import crypto from 'crypto';

export class FileStorage {
    public static moveFile = async (file: any): Promise<string> => {
        const uploadPath = 'src/app/ship/storage/files/';
        const sliptResult: Array<string> = file.name.split('.');

        const newFileName =
            crypto.randomBytes(20).toString('hex') + '.' + sliptResult[sliptResult.length - 1];
        await file.mv(uploadPath + newFileName);

        return '/storage/files/' + newFileName;
    };
}
