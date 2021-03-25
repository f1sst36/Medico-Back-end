import express from "express";
import { Request, Response } from "express";

import { CoreController } from "../../../ship/core/controller/CoreController";
import { coreTransformer } from "../../../ship/core/transformer/CoreTransformer";
import { getAllSpecialtiesTask } from "../tasks/GetAllSpecialtiesTask";

export class SpecialtiesController extends CoreController {
    constructor() {
        super();
        this.prefix = "/doctor/specialties";
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + "/", this.getSpecialties);
    }

    getSpecialties = async (_: Request, res: Response): Promise<Response> => {
        const specialties = await getAllSpecialtiesTask.run();

        if (specialties === null)
            return res
                .status(400)
                .json(coreTransformer.getErrorResponse("Ошибка получения специальностей"));
        else return res.status(200).json(coreTransformer.getSimpleSuccessResponse("", specialties));
    };
}
