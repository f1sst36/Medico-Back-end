import { coreTransformer } from "../../../ship/core/transformer/CoreTransformer";
import express from "express";
import { Request, Response } from "express";

import { CoreController } from "../../../ship/core/controller/CoreController";
import { getDoctorsByPaginate } from "../tasks/GetDoctorsByPaginate";
import { doctorsByPaginateTransformer } from "../transformers/DoctorsByPaginateTransformer";
import { doctorsPaginateValidator } from "../validators/doctorsPaginateValidator";
import { doctorByIdValidator } from "../validators/doctorByIdValidator";
import { getDoctorByIdTask } from "../tasks/GetDoctorByIdTask";
import { doctorByIdTransformer } from "../transformers/DoctorByIdTransformer";
import { doctorRepository } from "../repositories/DoctorRepository";
import { getMostExperiencedDoctorsTask } from "../tasks/GetMostExperiencedDoctorsTask";
import { mostExperiencedDoctorsValidator } from "../validators/mostExperiencedDoctorsValidator";
import { mostExperiencedDoctorsTransformer } from "../transformers/MostExperiencedDoctorsTransformer";

export class DoctorController extends CoreController {
    constructor() {
        super();
        this.prefix = "/doctor";
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(
            this.prefix + "/paginate/",
            doctorsPaginateValidator,
            this.getDoctorsByPaginate
        );
        this.router.get(this.prefix + "/info", doctorByIdValidator, this.getDoctorById);
        this.router.get(this.prefix + "/unverified", this.getUnverifiedDoctors);
        this.router.get(
            this.prefix + "/most-experienced",
            mostExperiencedDoctorsValidator,
            this.getMostExperiencedDoctors
        );
    }

    public getDoctorsByPaginate = async (req: Request, res: Response) => {
        if (this.validateRequest(req, res)) return;

        // if (+req.query.page <= 0 || +req.query.count <= 0)
        //     return res
        //         .status(422)
        //         .json(coreTransformer.getErrorResponse("Неверный формат параметров"));

        const result = await getDoctorsByPaginate.run(
            +req.query.page,
            +req.query.count,
            String(req.query.fio),
            String(req.query.specialty)
        );

        if (result.error) {
            if (result.data && !result.data.length)
                return res
                    .status(404)
                    .json(coreTransformer.getErrorResponse(result.message, result.data));
            else return res.status(400).json(coreTransformer.getErrorResponse(result.message));
        }

        const transformedDoctors = doctorsByPaginateTransformer.transform(result.data.items);

        res.status(200).json(
            coreTransformer.getSimpleSuccessResponse("", {
                items: transformedDoctors,
                meta: result.data.meta,
            })
        );
    };

    public getDoctorById = async (req: Request, res: Response) => {
        if (this.validateRequest(req, res)) return;

        const result = await getDoctorByIdTask.run(+req.query.id);

        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    "",
                    doctorByIdTransformer.transform(result.data)
                )
            );
    };

    public getUnverifiedDoctors = async (req: Request, res: Response) => {
        const result = await doctorRepository.getUnverifiedDoctors();

        if (!result || !result.length)
            return res.status(404).json(coreTransformer.getErrorResponse("Врачи не найдены"));

        return res.status(200).json(result);
    };

    public getMostExperiencedDoctors = async (req: Request, res: Response) => {
        if (this.validateRequest(req, res)) return;

        // if (+req.query.count <= 0)
        //     return res
        //         .status(422)
        //         .json(coreTransformer.getErrorResponse("Неверный формат параметров"));

        const result = await getMostExperiencedDoctorsTask.run(+req.query.count);

        if (result.error || !result.data.length)
            return res.status(404).json(coreTransformer.getErrorResponse("Врачи не найдены"));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    "",
                    mostExperiencedDoctorsTransformer.transform(result.data)
                )
            );
    };
}
