import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { appointmentForConsultationValidator } from '../validators/appointmentForConsultationValidator';
import { freeDoctorTimeValidator } from '../validators/freeDoctorTimeValidator';
import { metaInfoForAppointmentValidator } from '../validators/metaInfoForAppointmentValidator';
import { getMetaInfoForAppointmentAction } from '../actions/GetMetaInfoForAppointmentAction';
import { metaInfoForAppointmentTransformer } from '../transformers/MetaInfoForAppointmentTransformer';
import { appointmentForConsultationAction } from '../actions/AppointmentForConsultationAction';
import { getFreeDoctorTimeTask } from '../tasks/GetFreeDoctorTimeTask';
import { format } from 'date-fns';

export class AppointmentController extends CoreController {
    constructor() {
        super();
        this.prefix = '/consultation/appointment';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(
            this.prefix + '/create',
            appointmentForConsultationValidator,
            this.appointmentForConsultation
        );
        this.router.get(
            this.prefix + '/free-doctor-time',
            freeDoctorTimeValidator,
            this.getFreeDoctorTime
        );
        this.router.get(
            this.prefix + '/meta-info',
            metaInfoForAppointmentValidator,
            this.getMetaInfoForAppointment
        );
    }

    public appointmentForConsultation = async (req: any, res: Response) => {
        if (this.validateRequest(req, res)) return;

        const result = await appointmentForConsultationAction.run(
            req.body.doctorId,
            req.user.id,
            req.body.receptionDate,
            req.body.communicationMethodId,
            req.body.doctorSpecialtyId,
            req.body.symptoms
        );

        if (result.error)
            return res.status(422).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    'Вы успешно записались на консультацию',
                    null
                )
            );
    };

    public getMetaInfoForAppointment = async (req: Request, res: Response) => {
        if (this.validateRequest(req, res)) return;

        const result = await getMetaInfoForAppointmentAction.run(+req.query.doctorId);
        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    metaInfoForAppointmentTransformer.transform(
                        result.data.doctor,
                        result.data.countOfReviews,
                        result.data.communicationMethods
                    )
                )
            );
    };

    public getFreeDoctorTime = async (req: Request, res: Response) => {
        if (this.validateRequest(req, res)) return;

        let result;
        try {
            result = await getFreeDoctorTimeTask.run(+req.query.doctorId, String(req.query.date));
        } catch (e) {
            console.log(e);
            return res
                .status(422)
                .json(
                    coreTransformer.getErrorResponse(
                        'Ошбика выполнения метода для поиска свободного времени у врача'
                    )
                );
        }

        if (result.error)
            return res
                .status(result.error === 2 ? 400 : 404)
                .json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(coreTransformer.getSimpleSuccessResponse(result.message, result.data));
    };
}
