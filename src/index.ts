import { App } from './app/ship/app';
import 'dotenv/config';

import { AuthController } from './app/containers/authorization/controllers/auth/AuthController';
import { ProfileController as PatientProfileController } from './app/containers/patient/controllers/ProfileController';
import { SpecialtiesController } from './app/containers/doctor/controllers/SpecialtiesController';
import { ProfileController as DoctorProfileController } from './app/containers/doctor/controllers/ProfileController';
import { ProfileController as UserProfileController } from './app/containers/user/controllers/ProfileController';

import { User, userSchema } from './app/containers/user/models/User';
import { Patient, patientSchema } from './app/containers/patient/models/Patient';
import {
    Doctor,
    doctorSchema,
    DoctorSpecialtiesLink,
    doctorSpecialtiesLinkSchema,
    Specialties,
    specialtiesSchema,
} from './app/containers/doctor/models';
import { jsonErrorHandler, allowCrossDomain, verifyJWTToken } from './app/ship/middlewares';
import { DoctorController } from './app/containers/doctor/controllers/DoctorController';
import { Review, reviewSchema } from './app/containers/doctor/models/Review';
import {
    Consultation,
    consultationSchema,
} from './app/containers/consultation/models/Consultation';
import {
    CommunicationMethod,
    communicationMethodSchema,
} from './app/containers/consultation/models/CommunicationMethod';
import { AppointmentController } from './app/containers/consultation/controllers/AppointmentController';
import { ReviewController } from './app/containers/doctor/controllers/ReviewController';
import { permissionByRole } from './app/ship/middlewares/permissionByRole';
import { ConsultationController } from './app/containers/consultation/controllers/ConsultationController';

const app = new App({
    port: +process.env.PORT || 8080,
    prefix: '/api/v1',
    controllers: [
        new AuthController(),
        new PatientProfileController(),
        new SpecialtiesController(),
        new DoctorProfileController(),
        new UserProfileController(),
        new DoctorController(),
        new AppointmentController(),
        new ReviewController(),
        new ConsultationController()
    ],
    middlewares: [allowCrossDomain, verifyJWTToken, jsonErrorHandler, permissionByRole],
    models: [
        {
            model: User,
            schema: userSchema,
            tableName: 'Users',
        },
        {
            model: Patient,
            schema: patientSchema,
            tableName: 'Patients',
        },
        {
            model: Doctor,
            schema: doctorSchema,
            tableName: 'Doctors',
        },
        {
            model: Specialties,
            schema: specialtiesSchema,
            tableName: 'Specialties',
        },
        {
            model: DoctorSpecialtiesLink,
            schema: doctorSpecialtiesLinkSchema,
            tableName: 'DoctorSpecialtiesLink',
        },
        {
            model: Review,
            schema: reviewSchema,
            tableName: 'Reviews',
        },
        {
            model: Consultation,
            schema: consultationSchema,
            tableName: 'Consultations',
        },
        {
            model: CommunicationMethod,
            schema: communicationMethodSchema,
            tableName: 'CommunicationMethods',
        },
        // {
        //     model: Payment,
        //     schema: paymentSchema,
        //     tableName: 'Payments',
        // },
        // {
        //     model: Card,
        //     schema: cardSchema,
        //     tableName: 'Cards',
        // },
    ],
});

app.listen();
