import express from "express";
import { Request, Response } from "express";
import { CoreController } from "../../../ship/core/controller/CoreController";
import { coreTransformer } from "../../../ship/core/transformer/CoreTransformer";
import { Doctor } from "../../doctor/models";
import { doctorRepository } from "../../doctor/repositories/DoctorRepository";
import { Patient } from "../../patient/models/Patient";
import { patientRepository } from "../../patient/repositories/PatientRepository";

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

    public async getInfo(req: any, res: Response): Promise<Response> {
        let user: Doctor | Patient;
        try {
            user = await patientRepository.getPatientById(req.user.id);
            if (!user) user = await doctorRepository.getDoctorById(req.user.id);
        } catch (_) {
            return res
                .status(400)
                .json(coreTransformer.getErrorResponse("Ошибка поиска пользователя"));
        }

        if (!user)
            return res.status(404).json(coreTransformer.getErrorResponse("Пользователь не найден"));

        return res.json({
            abc: user,
        });
    }
}
