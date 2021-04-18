import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { appointmentForConsultationValidator } from '../validators/appointmentForConsultationValidator';
import { createConsultationTask } from '../tasks/CreateConsultationTask';
import { freeDoctorTimeValidator } from '../validators/freeDoctorTimeValidator';
import { getFreeDoctorTimeAction } from '../actions/GetFreeDoctorTimeAction';

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
        this.router.get(
            this.prefix + '/free-doctor-time',
            freeDoctorTimeValidator,
            this.getFreeDoctorTime
        );
    }

    public appointmentForConsultation = async (req: any, res: Response) => {
        if (this.validateRequest(req, res)) return;

        // еще не готово

        const consultationFileds = req.body;
        consultationFileds.patientId = req.user.id;
        const consultation = await createConsultationTask.run(consultationFileds);

        if (!consultation)
            res.status(422).json(coreTransformer.getErrorResponse('Ошибка записи на консультацию'));

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse('', consultation));
    };

    public getFreeDoctorTime = async (req: Request, res: Response) => {
        if (this.validateRequest(req, res)) return;

        let result;
        try {
            result = await getFreeDoctorTimeAction.run(
                +req.query.doctorId,
                String(req.query.date)
            );
        } catch (e) {
            console.log(e);
            return res
                .status(404)
                .json(coreTransformer.getErrorResponse('Ошбика выполнения экшена'));
        }

        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(coreTransformer.getSimpleSuccessResponse(result.message, result.data));
    };
}
