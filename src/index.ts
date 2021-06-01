import { App } from './app/ship/app';
import 'dotenv/config';

import { AuthController } from './app/containers/authorization/controllers/auth/AuthController';
import { ProfileController as PatientProfileController } from './app/containers/patient/controllers/ProfileController';
import { SpecialtyController } from './app/containers/doctor/controllers/SpecialtyController';
import { ProfileController as DoctorProfileController } from './app/containers/doctor/controllers/ProfileController';
import { ProfileController as UserProfileController } from './app/containers/user/controllers/ProfileController';

import { User, userSchema } from './app/containers/user/models/User';
import { Patient, patientSchema } from './app/containers/patient/models/Patient';
import {
    Doctor,
    doctorSchema,
    DoctorSpecialtiesLink,
    doctorSpecialtiesLinkSchema,
    Specialty,
    specialtySchema,
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
import { Analysis, analysisSchema } from './app/containers/patient/models/Analysis';
import { AnalysisController } from './app/containers/patient/controllers/AnalysisController';
import { PatientController } from './app/containers/patient/controllers/PatientController';
import { Chat, chatSchema } from './app/containers/chat/models/Chat';
import { Message, messageSchema } from './app/containers/chat/models/Message';
import { MediaFile, mediaFileSchema } from './app/containers/chat/models/MediaFile';
import { Feedback, feedbackSchema } from './app/containers/feedback/model/Feedback';
import { FeedbackController } from './app/containers/feedback/controllers/FeedbackController';
import { messagesQueue } from './app/containers/chat/queues/MessagesQueue';
import { ChatController } from './app/containers/chat/controllers/ChatController';
import { MessageController } from './app/containers/chat/controllers/MessageController';
import { AdminController } from './app/containers/admin/controllers/AdminController';

setInterval(() => console.log('ping'), 30_000);

export const app = new App({
    port: +process.env.PORT || 8080,
    prefix: '/api/v1',
    controllers: [
        new AuthController(),
        new PatientProfileController(),
        new SpecialtyController(),
        new DoctorProfileController(),
        new UserProfileController(),
        new DoctorController(),
        new AppointmentController(),
        new ReviewController(),
        new ConsultationController(),
        new AnalysisController(),
        new PatientController(),
        new FeedbackController(),
        new ChatController(),
        new MessageController(),
        new AdminController(),
    ],
    middlewares: [allowCrossDomain, verifyJWTToken, jsonErrorHandler, permissionByRole],
    queues: [messagesQueue],
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
            model: Specialty,
            schema: specialtySchema,
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
        {
            model: Analysis,
            schema: analysisSchema,
            tableName: 'Analyzes',
        },
        {
            model: Chat,
            schema: chatSchema,
            tableName: 'Chats',
        },
        {
            model: Message,
            schema: messageSchema,
            tableName: 'Messages',
        },
        {
            model: MediaFile,
            schema: mediaFileSchema,
            tableName: 'MediaFiles',
        },
        {
            model: Feedback,
            schema: feedbackSchema,
            tableName: 'Feedback',
        },
    ],
});

app.listen();
