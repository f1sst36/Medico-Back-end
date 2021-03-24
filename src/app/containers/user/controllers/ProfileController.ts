import express from "express";
import { Request, Response } from "express";
import { CoreController } from "../../../ship/core/controller/CoreController";
import { coreTransformer } from "../../../ship/core/transformer/CoreTransformer";
import { Doctor } from "../../doctor/models";
import { doctorRepository } from "../../doctor/repositories/DoctorRepository";
import { Patient } from "../../patient/models/Patient";
import { patientRepository } from "../../patient/repositories/PatientRepository";
import { getUserInfoAction } from "../actions/getUserInfoAction";
import { userTransformer } from "../transformers/UserTransformer";

export class ProfileController extends CoreController {
    constructor() {
        super();
        this.prefix = "/user";
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + "/", this.getInfo);
    }

    public getInfo = async (req: any, res: Response): Promise<Response> => {
        const result = await getUserInfoAction.run(req.user.id);

        if (result.error)
            return res.status(400).json(coreTransformer.getErrorResponse(result.message));
        else {
            const transformedUser = userTransformer.transform(result.data);
            return res.status(200).json(coreTransformer.getSimpleSuccessResponse("", transformedUser));
        }
    };
}
