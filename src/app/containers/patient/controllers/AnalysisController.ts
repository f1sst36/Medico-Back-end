import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { getAllAnalyzesByPatientIdTask } from '../tasks/GetAllAnalyzesByPatientIdTask';

export class AnalysisController extends CoreController {
    constructor() {
        super();
        this.prefix = '/patient/analysis';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + '/all', this.getAllAnalyzesForPatient);
    }

    public getAllAnalyzesForPatient = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await getAllAnalyzesByPatientIdTask.run(req.user.id);

        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse('', result.data));
    };
}
