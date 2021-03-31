import express from "express";
import { Request, Response } from "express";

import { CoreController } from "../../../ship/core/controller/CoreController";
import { coreTransformer } from "../../../ship/core/transformer/CoreTransformer";
import { questionnaireFormAction } from "../actions/QuestionnaireFormAction";
import { questionnaireFormValidator } from "../validators";

export class ProfileController extends CoreController {
    constructor() {
        super();
        this.prefix = "/patient/profile";
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(
            this.prefix + "/questionnaire",
            questionnaireFormValidator,
            this.patientQuestionnaireForm
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
                        "Анкета успешно заполнена",
                        result.data
                    )
                );
        else return res.status(400).json(coreTransformer.getErrorResponse(result.message));
    };
}
