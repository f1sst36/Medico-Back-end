import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import {
    doctorQuestionnaireFormFilesValidator,
    doctorQuestionnaireFormValidator,
} from '../validators/doctorQuestionnaireFormValidator';
import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { doctorQuestionnaireAction } from '../actions/DoctorQuestionnaireAction';

export class ProfileController extends CoreController {
    constructor() {
        super();
        this.prefix = '/doctor/profile';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(this.prefix + '/questionnaire', doctorQuestionnaireFormValidator, this.doctorQuestionnaireForm);
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
}
