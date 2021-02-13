import express from "express";
import { Request, Response } from "express";

import { CoreController } from "../../../../ship/core/controller/CoreController";

import { User } from "../../../user/models/User";
import { Doctor } from "../../../doctor/models/Doctor";
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

    getPacientInfo = async (req: Request, res: Response): Promise<Response> => {
        // if (this.validateRequest(req, res)) return;

        const newUser = await User.create({
            name: "Vasya Pool",
            age: 2456,
            password: "123456",
            phone: "+634574576570",
            sex: "female",
            birthDate: "2021-05-30",
            surname: "123456",
            middleName: "123456",
            email: "f1dfgfgh6@gmail.com",
            confirmationToken: "423562h562b6g23gv",
        });

        const newPacient = await Pacient.create({
            id: newUser.id,
            isSmoker: false,
        });

        console.log("User-pacient", newPacient);

        const newUser2 = await User.create({
            name: "Vasya Pool 2",
            age: 2456,
            password: "123456",
            phone: "+63457657440",
            sex: "female",
            birthDate: "2021-05-30",
            surname: "123456",
            middleName: "123456",
            email: "f1d74fgh6@gmail.com",
            confirmationToken: "423562h562b6g23gv",
        });

        const newDoctor = await Doctor.create({
            id: newUser2.id,
            IIN: "63462474745",
        });

        console.log("User-doctor", newDoctor);

        Doctor.findAll({
            include: [
                {
                    model: User,
                    as: "user", // <--------- Here is the magic
                },
            ],
        })
            .then((data) => {
                console.log("Doctor", data);
            })
            .catch((err) => {
                this.result = res.status(200).json({
                    error: 1,
                    data: err,
                    message: "Ошибка выборки пациента",
                });
            });

        Pacient.findAll({
            include: [
                {
                    model: User,
                    as: "user", // <--------- Here is the magic
                },
            ],
        })
            .then((data) => {
                console.log("Pacient", data);
            })
            .catch((err) => {
                this.result = res.status(200).json({
                    error: 1,
                    data: err,
                    message: "Ошибка выборки пациента",
                });
            });

        // .then((newPacient) => {
        //     User.create({
        //         id: newPacient.id,
        //         name: "Vasya Pool",
        //         age: 2456,
        //         password: "123456",
        //         phone: "+634574576570",
        //         sex: "female",
        //         birthDate: "2021-05-30",
        //         surname: "123456",
        //         middleName: "123456",
        //         email: "f1dfgfgh6@gmail.com",
        //         confirmationToken: "423562h562b6g23gv",
        //     })
        //         .then((newPacient) => {
        //             // console.log(newPacient);
        //             Pacient.findAll({ include: "user" })
        //                 .then((data) => {
        //                     console.log("USER", data);
        //                 })
        //                 .catch((err) => {
        //                     this.result = res.status(200).json({
        //                         error: 1,
        //                         data: err,
        //                         message: "Ошибка выборки пациента",
        //                     });
        //                 });

        //             // newPacient.associate();
        //         })
        //         .catch((err) => {
        //             this.result = res
        //                 .status(200)
        //                 .json({ error: 1, data: err, message: "Ошибка создания пациента" });
        //         });
        // })
        // .catch((err) => {
        //     console.log(err);
        //     this.result = res
        //         .status(200)
        //         .json({ error: 1, data: err, message: "Ошибка создания пользователя" });
        // });
        // console.log(newUser);

        return res.status(200).json(this.result);
    };
}
