import crypto from 'crypto';

export class FileStorage {
    public static moveFile = async (file: any): Promise<string> => {
        const uploadPath = 'src/app/ship/storage/files/';
        const newFileName = crypto.randomBytes(20).toString('hex');
        await file.mv(uploadPath + newFileName);

        return '/storage/files/' + newFileName;
    };
}
