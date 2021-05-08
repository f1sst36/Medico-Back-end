import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import {
    doctorQuestionnaireFormFilesValidator,
    doctorQuestionnaireFormValidator,
} from '../validators/doctorQuestionnaireFormValidator';
import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { doctorQuestionnaireAction } from '../actions/DoctorQuestionnaireAction';
import { getDoctorsScheduleTask } from '../tasks/GetDoctorsScheduleTask';
import { doctorsScheduleTransformer } from '../transformers/DoctorsScheduleTransformer';
import { changeDoctorsScheduleAction } from '../actions/ChangeDoctorsScheduleAction';
import { changeDoctorsScheduleValidator } from '../validators/changeDoctorsScheduleValidator';

export class ProfileController extends CoreController {
    constructor() {
        super();
        this.prefix = '/doctor/profile';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(
            this.prefix + '/questionnaire',
            doctorQuestionnaireFormValidator,
            this.doctorQuestionnaireForm
        );
        this.router.get(this.prefix + '/schedule', this.getDoctorsSchedule);
        this.router.post(
            this.prefix + '/change-schedule',
            changeDoctorsScheduleValidator,
            this.changeDoctorsSchedule
        );
    }

    public doctorQuestionnaireForm = async (req: any, res: Response): Promise<Response> => {
        if (
            this.validateRequest(req, res) ||
            this.validateFormDataRequest(req, res, doctorQuestionnaireFormFilesValidator)
        )
            return;

        const result = await doctorQuestionnaireAction.run(req.user.id, req.body, req.files);

        if (result.error === 0)
            return res
                .status(200)
                .json(
                    coreTransformer.getSimpleSuccessResponse(
                        'Заявка отправлена на рассмотрение',
                        result.data
                    )
                );
        else return res.status(422).json(coreTransformer.getErrorResponse(result.message));
    };

    // Метод только для доктора
    public getDoctorsSchedule = async (req: any, res: Response): Promise<Response> => {
        const result = await getDoctorsScheduleTask.run(req.user.id);

        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    doctorsScheduleTransformer.transform(result.data)
                )
            );
    };

    // Метод только для доктора
    public changeDoctorsSchedule = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await changeDoctorsScheduleAction.run(req.user.id, req.body.schedule);

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse('', result.data));
    };
}
