import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { createAnalysisTask } from '../tasks/CreateAnalysisTask';
import { deleteAnalysisTask } from '../tasks/DeleteAnalysisTask';
import { getAllAnalyzesByPatientIdTask } from '../tasks/GetAllAnalyzesByPatientIdTask';
import { appendAnalysisTransformer } from '../transformers/AppendAnalysisTransformer';
import {
    appendAnalysisValidator,
    isValidImageValidator,
} from '../validators/appendAnalysisValidator';
import { deleteAnalysisValidator } from '../validators/deleteAnalysisValidator';

export class AnalysisController extends CoreController {
    constructor() {
        super();
        this.prefix = '/patient/analysis';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + '/all', this.getAllAnalyzesForPatient);
        this.router.post(this.prefix + '/append', appendAnalysisValidator, this.appendAnalysis);
        this.router.post(this.prefix + '/delete', deleteAnalysisValidator, this.deleteAnalysis);

    }

    public getAllAnalyzesForPatient = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await getAllAnalyzesByPatientIdTask.run(req.user.id);

        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse('', result.data));
    };

    public appendAnalysis = async (req: any, res: Response): Promise<Response> => {
        if (
            this.validateRequest(req, res) ||
            this.validateFormDataRequest(req, res, isValidImageValidator)
        )
            return;

        const result = await createAnalysisTask.run(
            req.user.id,
            req.body.name,
            req.body.type,
            req.body.analysisDeliveryDate,
            req.files.file
        );

        if (result.error)
            return res.status(422).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    appendAnalysisTransformer.transform(result.data)
                )
            );
    };

    public deleteAnalysis = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await deleteAnalysisTask.run(req.user.id, req.body.analysisId);

        if (result.error)
            return res.status(422).json(coreTransformer.getErrorResponse(result.message));

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse('', result.data));
    };
}
