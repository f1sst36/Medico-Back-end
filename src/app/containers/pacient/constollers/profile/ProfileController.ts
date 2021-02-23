import express from "express";
import { Request, Response } from "express";

import { CoreController } from "../../../../ship/core/controller/CoreController";

import { User } from "../../../user/models/User";
import { Doctor, DoctorSpecialtiesLink, Specialties } from "../../../doctor/models";
import { Pacient } from "../../models/Pacient";

export class ProfileController extends CoreController {
    constructor() {
        super();
        this.prefix = "/pacient/profile";
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + "/", this.getPacientInfo);
    }

    private result = {};

    getPacientInfo = async (req: any, res: Response): Promise<Response> => {
        // if (this.validateRequest(req, res)) return;
        // console.log(req.body.user);

        await DoctorSpecialtiesLink.create({
            doctorId: 1,
            specialtyId: 2,
        });

        const a = await DoctorSpecialtiesLink.findAll({
            include: [
                {
                    model: Doctor,
                    as: "doctor",
                },
                {
                    model: Specialties,
                    as: "specialty",
                },
            ],
        });

        this.result = a;

        return res.status(200).json(this.result);
    };
}
