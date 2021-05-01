import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { getPatientInfoForConsultationTask } from '../tasks/GetPatientInfoForConsultationTask';

export class PatientController extends CoreController {
    constructor() {
        super();
        this.prefix = '/patient';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        //
    }

    public getPatientInfoForConsultation = async (req: any, res: Response): Promise<Response> => {
        if(this.validateRequest(req, res)) return

        const result = getPatientInfoForConsultationTask.run(req.query.patientId, req.user.id);
        
        return res.status(200).json({});
    }
}
