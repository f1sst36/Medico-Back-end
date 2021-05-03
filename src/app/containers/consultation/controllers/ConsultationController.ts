import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Request, Response } from 'express';

import { CoreController } from '../../../ship/core/controller/CoreController';
import { consultationsForCurrentPatientValidator } from '../validators/consultationsForPatientValidator';
import { getConsultationsByStateAndPatientIdTask } from '../tasks/GetConsultationsByStateAndPatientIdTask';
import { consultationsForCurrentPatientTransformer } from '../transformers/ConsultationsForCurrentPatientTransformer';
import { cancelConsultationTask } from '../tasks/CancelConsultationTask';
import { cancelConsultationValidator } from '../validators/cancelConsultationValidator';
import { getDoctorsAppointmentsByPatientIdTask } from '../tasks/GetDoctorsAppointmentsByPatientIdTask';
import { getDoctorsAppointmentsTransformer } from '../transformers/GetDoctorsAppointmentsTransformer';
import { getPatientsAppointmentsByDateTask } from '../tasks/GetPatientsAppointmentsByDateTask';
import { patientsAppointmentsByDateValidator } from '../validators/patientsAppointmentsByDateValidator';
import { getPatientsAppointmentsByDateTransformer } from '../transformers/GetPatientsAppointmentsByDateTransformer';
import { addAppointmentForPatientValidator } from '../validators/addAppointmentForPatientValidator';
import { addAppointmentForPatientAction } from '../actions/AddAppointmentForPatientAction';

export class ConsultationController extends CoreController {
    constructor() {
        super();
        this.prefix = '/consultation';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(
            this.prefix + '/doctors-for-patient',
            consultationsForCurrentPatientValidator,
            this.getConsultationsForCurrentPatient
        );
        this.router.post(
            this.prefix + '/cancel',
            cancelConsultationValidator,
            this.cancelConsultation
        );
        this.router.get(this.prefix + '/appointments', this.getDoctorsAppointments);
        this.router.get(
            this.prefix + '/patients-for-doctor',
            patientsAppointmentsByDateValidator,
            this.getPatientsAppointmentsByDate
        );
        this.router.post(
            this.prefix + '/add-appointment',
            addAppointmentForPatientValidator,
            this.addAppointmentForPatient
        );
    }

    public getConsultationsForCurrentPatient = async (
        req: any,
        res: Response
    ): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await getConsultationsByStateAndPatientIdTask.run(
            String(req.query.consultationState),
            req.user.id
        );

        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    consultationsForCurrentPatientTransformer.transform(result.data)
                )
            );
    };

    public cancelConsultation = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await cancelConsultationTask.run(req.body.consultationId, req.user.id);

        if (result.error)
            return res
                .status(result.error === 1 ? 404 : 422)
                .json(coreTransformer.getErrorResponse(result.message));

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse(result.message));
    };

    // Список консультаций для пациента
    public getDoctorsAppointments = async (req: any, res: Response): Promise<Response> => {
        const result = await getDoctorsAppointmentsByPatientIdTask.run(req.user.id);

        if (result.error)
            return res.status(404).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    getDoctorsAppointmentsTransformer.transform(result.data)
                )
            );
    };

    // Список консультаций для врача
    public getPatientsAppointmentsByDate = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await getPatientsAppointmentsByDateTask.run(
            req.user.id,
            String(req.query.date)
        );

        if (result.error)
            return res
                .status(result.error === 1 ? 404 : 422)
                .json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    getPatientsAppointmentsByDateTransformer.transform(result.data)
                )
            );
    };

    // Доктор добавляет "Назначение врача"
    public addAppointmentForPatient = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await addAppointmentForPatientAction.run(
            req.user.id,
            req.body.patientId,
            req.body.consultationId,
            req.body.appointmentText
        );

        if (result.error)
            return res
                .status(result.error === 1 ? 403 : 422)
                .json(coreTransformer.getErrorResponse(result.message));

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse('', result.data));
    };
}
