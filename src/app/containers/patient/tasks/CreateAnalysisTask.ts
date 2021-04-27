import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { Analysis } from '../models/Analysis';

class CreateAnalysisTask extends CoreTask {
    public run = async (
        patientId: number,
        name: string,
        type: string,
        analysisDeliveryDate: Date,
        file: any
    ): Promise<IResult> => {
        const uploadPath = 'src/app/ship/storage/files/' + file.name;
        const pathToFileImage = '/storage/files/' + file.name;
        try {
            await file.mv(uploadPath);
            const analysis = await Analysis.create({
                patientId: patientId,
                name: name,
                type: type,
                analysisDeliveryDate: analysisDeliveryDate,
                path: pathToFileImage,
            });

            return {
                error: 0,
                data: analysis,
            };
        } catch (e) {
            console.log(e);
            return {
                error: 1,
                message: 'Ошибка загрузки файла',
            };
        }
    };
}

export const createAnalysisTask = new CreateAnalysisTask();
