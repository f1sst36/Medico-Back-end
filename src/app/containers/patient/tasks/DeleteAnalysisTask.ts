import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { analysisRepository } from '../repositories/AnalysisRepository';

class DeleteAnalysisTask extends CoreTask {
    public run = async (patientId: number, analysisId: number): Promise<IResult> => {
        const analysis = await analysisRepository.deleteAlanysisById(patientId, analysisId);

        if (!analysis)
            return {
                error: 1,
                message: 'Ошибка удаления анализа',
            };

        return {
            error: 0,
            data: null,
            message: '',
        };
    };
}

export const deleteAnalysisTask = new DeleteAnalysisTask();
