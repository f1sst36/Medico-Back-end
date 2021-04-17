import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { getOldReviewsTask } from '../tasks/GetOldReviewsTask';
import { oldReviewsTransformer } from '../transformers/OldReviewsTransformer';
import { oldReviewsValidator } from '../validators/oldReviewsValidator';

export class ReviewController extends CoreController {
    constructor() {
        super();
        this.prefix = '/doctor/review';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + '/list', oldReviewsValidator, this.getOldReviews);
    }

    public getOldReviews = async (req: Request, res: Response) => {
        if (this.validateRequest(req, res)) return;

        const result = await getOldReviewsTask.run(
            +req.query.reviewId,
            +req.query.doctorId,
            +req.query.count
        );

        if (result.error === 1)
            return res.status(422).json(coreTransformer.getErrorResponse(result.message));
        if (result.error === 2)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res.status(200).json(
            coreTransformer.getSimpleSuccessResponse('', {
                items: oldReviewsTransformer.transform(result.data.items),
                count: result.data.count,
            })
        );
    };
}
