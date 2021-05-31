import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { MediaFile } from '../models/MediaFile';

class MediaFileRepository extends CoreRepository {
    constructor() {
        super();
        this.model = MediaFile;
    }

    public appendMediaFile = (
        messageId: number,
        name: string,
        size: number,
        type: string,
        path: string
    ): Promise<MediaFile> => {
        return this.model.create({
            messageId: messageId,
            name: name,
            size: size,
            type: type,
            path: path,
        });
    };
}

export const mediaFileRepository = new MediaFileRepository();
