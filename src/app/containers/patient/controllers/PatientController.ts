import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { getPatientInfoForConsultationTask } from '../tasks/GetPatientInfoForConsultationTask';
import { patientInfoForConsultationValidator } from '../validators/patientInfoForConsultationValidator';
import { patientInfoForConsultationTransformer } from '../transformers/PatientInfoForConsultationTransformer';

export class PatientController extends CoreController {
    constructor() {
        super();
        this.prefix = '/patient';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(
            this.prefix + '/consultation-info',
            patientInfoForConsultationValidator,
            this.getPatientInfoForConsultation
        );
    }

    // Информация о пациете для врача, у которого есть консультация с этим пациентом
    public getPatientInfoForConsultation = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await getPatientInfoForConsultationTask.run(
            req.query.patientId,
            req.user.id,
            req.query.consultationId
        );

        if (result.error)
            return res
                .status(result.error === 1 ? 403 : result.error === 2 ? 404 : 422)
                .json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    patientInfoForConsultationTransformer.transform(result.data)
                )
            );
    };
}
