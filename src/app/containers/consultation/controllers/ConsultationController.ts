import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { consultationsForCurrentPatientValidator } from '../validators/consultationsForPatientValidator';
import { getConsultationsByStateAndPatientIdTask } from '../tasks/GetConsultationsByStateAndPatientIdTask';
import { consultationsForCurrentPatientTransformer } from '../transformers/ConsultationsForCurrentPatientTransformer';

export class ConsultationController extends CoreController {
    constructor() {
        super();
        this.prefix = '/consultation';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(
            this.prefix + '/patient',
            consultationsForCurrentPatientValidator,
            this.getConsultationsForCurrentPatient
        );
    }

    public getConsultationsForCurrentPatient = async (req: any, res: Response) => {
        if (this.validateRequest(req, res)) return;

        const result = await getConsultationsByStateAndPatientIdTask.run(
            String(req.query.consultationState),
            req.user.id
        );

        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    consultationsForCurrentPatientTransformer.transform(result.data)
                )
            );
    };
}
