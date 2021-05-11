import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { leaveFeedbackAction } from '../actions/LeaveFeedbackAction';
import { leaveFeedbackValidator } from '../validators/leaveFeedbackValidator';

export class FeedbackController extends CoreController {
    constructor() {
        super();
        this.prefix = '/feedback';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(this.prefix + '/leave', leaveFeedbackValidator, this.leaveFeedback);
    }

    public leaveFeedback = async (req: Request, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await leaveFeedbackAction.run(
            req.body.name,
            req.body.email,
            req.body.subject,
            req.body.text
        );

        if (result.error)
            return res.status(422).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(coreTransformer.getSimpleSuccessResponse(result.message, result.data));
    };
}
