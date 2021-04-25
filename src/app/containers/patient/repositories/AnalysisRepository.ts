import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { Analysis } from '../models/Analysis';

class AnalysisRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Analysis;
    }

    getAllAnalyzesForPatient = (patientId: number): Promise<Array<Analysis>> => {
        try {
            return this.model.findAll({
                where: {
                    patientId: patientId,
                },
                attributes: ['id', 'name', 'type', 'path', 'analysisDeliveryDate'],
            });
        } catch (e) {
            return null;
        }
    };
}

export const analysisRepository = new AnalysisRepository();
