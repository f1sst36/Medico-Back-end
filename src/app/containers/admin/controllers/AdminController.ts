import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { verifyDoctorAction } from '../actions/VerifyDoctorAction';
import { verifyDoctorValidator } from '../validators/verifyDoctorValidator';

export class AdminController extends CoreController {
    constructor() {
        super();
        this.prefix = '/admin';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(this.prefix + '/verify-doctor', verifyDoctorValidator, this.verifyDoctor);
    }

    public verifyDoctor = async (req: Request, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await verifyDoctorAction.run(req.body.doctorId);

        if (result.error)
            return res.status(422).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(coreTransformer.getSimpleSuccessResponse(result.message, result.data));
    };
}
