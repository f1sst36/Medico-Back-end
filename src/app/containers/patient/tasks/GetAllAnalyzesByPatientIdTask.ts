import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { analysisRepository } from '../repositories/AnalysisRepository';

class GetAllAnalyzesByPatientIdTask extends CoreTask {
    public run = async (patientId: number): Promise<IResult> => {
        const analyzes = await analysisRepository.getAllAnalyzesForPatient(patientId);

        if (!analyzes || !analyzes.length)
            return {
                error: 1,
                message: 'Анализы не найдены',
            };

        return {
            error: 0,
            data: analyzes,
            message: '',
        };
    };
}

export const getAllAnalyzesByPatientIdTask = new GetAllAnalyzesByPatientIdTask();
