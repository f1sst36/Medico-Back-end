import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { questionnaireFormAction } from '../actions/QuestionnaireFormAction';
import { changeMedicalCardTask } from '../tasks/ChangeMedicalCardTask';
import { changeMedicalCardTransformer } from '../transformers/ChangeMedicalCardTransformer';
import { questionnaireFormValidator } from '../validators';
import { changeMedicalCardValidator } from '../validators/changeMedicalCardValidator';

export class ProfileController extends CoreController {
    constructor() {
        super();
        this.prefix = '/patient/profile';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(
            this.prefix + '/questionnaire',
            questionnaireFormValidator,
            this.patientQuestionnaireForm
        );
        this.router.post(
            this.prefix + '/change-medical-card',
            changeMedicalCardValidator,
            this.changeMedicalCard
        );
    }

    public patientQuestionnaireForm = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await questionnaireFormAction.run(req.body, req.user.id);

        if (result.error === 0)
            return res
                .status(200)
                .json(
                    coreTransformer.getSimpleSuccessResponse(
                        'Анкета успешно заполнена',
                        result.data
                    )
                );
        else return res.status(422).json(coreTransformer.getErrorResponse(result.message));
    };

    public changeMedicalCard = async (req: any, res: Response) => {
        if (this.validateRequest(req, res)) return;

        const result = await changeMedicalCardTask.run(req.body, req.user.id);

        if (result.error)
            return res
                .status(result.error === 1 ? 400 : result.error === 2 ? 404 : 422)
                .json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    changeMedicalCardTransformer.transform(result.data)
                )
            );
    };
}
