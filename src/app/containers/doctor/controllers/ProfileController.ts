import path from "path";

import express from "express";
import { Request, Response } from "express";

import formidable from "formidable";

import { CoreController } from "../../../ship/core/controller/CoreController";
import { doctorQuestionnaireFormValidator } from "../validator/doctorQuestionnaireFormValidator";
import { coreTransformer } from "../../../ship/core/transformer/CoreTransformer";
import { doctorQuestionnaireAction } from "../actions/DoctorQuestionnaireAction";

export class ProfileController extends CoreController {
    constructor() {
        super();
        this.prefix = "/doctor/profile";
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(this.prefix + "/questionnaire", this.doctorQuestionnaireForm);
    }

    public doctorQuestionnaireForm = async (req: any, res: Response): Promise<Response> => {
        const validateFormDataResult = doctorQuestionnaireFormValidator(req.body, req.files);
        if (Array.isArray(validateFormDataResult))
            return res
                .status(400)
                .json(coreTransformer.getErrorResponse("Ошибка валидации", validateFormDataResult));

        const result = await doctorQuestionnaireAction.run(req.user.id, req.body, req.files);
        
        if (result.error === 0)
            return res.status(200).json(
                coreTransformer.getSimpleSuccessResponse(
                    "Заявка отправлена на рассмотрение"
                )
            );
        else
            return res
                .status(400)
                .json(coreTransformer.getErrorResponse(result.message));
    };
}
