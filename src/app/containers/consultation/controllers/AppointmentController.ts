import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { appointmentForConsultationValidator } from '../validators/appointmentForConsultationValidator';
import { createConsultationTask } from '../tasks/CreateConsultationTask';

export class AppointmentController extends CoreController {
    constructor() {
        super();
        this.prefix = '/consultation/appointment';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(
            this.prefix + '/',
            appointmentForConsultationValidator,
            this.appointmentForConsultation
        );
    }

    public appointmentForConsultation = async (req: any, res: Response) => {
        if (this.validateRequest(req, res)) return;

        const consultationFileds = req.body;
        consultationFileds.patientId = req.user.id;
        const consultation = await createConsultationTask.run(consultationFileds);

        if (!consultation)
            res.status(422).json(coreTransformer.getErrorResponse('Ошибка записи на консультацию'));

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse('', consultation));
    };
}
