import { Patient } from '../../containers/patient/models/Patient';
import { Doctor, DoctorSpecialtiesLink, Specialty } from '../../containers/doctor/models';
import { User } from '../../containers/user/models/User';
import { Review } from '../../containers/doctor/models/Review';
import { Consultation } from '../../containers/consultation/models/Consultation';
import { CommunicationMethod } from '../../containers/consultation/models/CommunicationMethod';
import { Analysis } from '../../containers/patient/models/Analysis';
import { Chat } from '../../containers/chat/models/Chat';
import { Message } from '../../containers/chat/models/Message';
import { MediaFile } from '../../containers/chat/models/MediaFile';

export const linkModels = () => {
    Patient.hasOne(User, { as: 'user', foreignKey: 'id', constraints: false });
    Doctor.hasOne(User, { as: 'user', foreignKey: 'id', constraints: false });
    //
    // ???????????
    User.belongsTo(Patient, { as: 'patient', foreignKey: 'id', constraints: false });
    User.belongsTo(Doctor, { as: 'doctor', foreignKey: 'id', constraints: false });

    // Message.belongsTo(Doctor, {
    //     as: 'doctor',
    //     foreignKey: 'authorId',
    //     constraints: false,
    // });
    // Message.belongsTo(Patient, {
    //     as: 'patient',
    //     foreignKey: 'authorId',
    //     constraints: false,
    // });
    // ???????????
    //
    DoctorSpecialtiesLink.belongsTo(Doctor, {
        as: 'doctor',
        foreignKey: 'doctorId',
    });
    Doctor.hasMany(DoctorSpecialtiesLink, {
        as: 'doctorSpecialtiesLink',
        foreignKey: 'doctorId',
        constraints: false,
    });
    DoctorSpecialtiesLink.belongsTo(Specialty, {
        as: 'specialty',
        foreignKey: 'specialtyId',
    });
    //
    Review.belongsTo(Patient, {
        as: 'patient',
        foreignKey: 'patientId',
        constraints: false,
    });
    Doctor.hasMany(Review, {
        as: 'reviews',
        foreignKey: 'doctorId',
        constraints: false,
    });
    //
    Consultation.belongsTo(Doctor, {
        as: 'doctor',
        foreignKey: 'doctorId',
        constraints: false,
    });
    Consultation.belongsTo(Specialty, {
        as: 'doctorSpecialty',
        foreignKey: 'doctorSpecialtyId',
        constraints: false,
    });
    Consultation.belongsTo(Patient, {
        as: 'patient',
        foreignKey: 'patientId',
        constraints: false,
    });
    Consultation.belongsTo(CommunicationMethod, {
        as: 'communicationMethod',
        foreignKey: 'communicationMethodId',
        constraints: false,
    });
    Consultation.belongsTo(Chat, {
        as: 'chat',
        foreignKey: 'chatId',
        constraints: false,
    });
    Doctor.hasMany(Consultation, {
        as: 'consultations',
        foreignKey: 'doctorId',
        constraints: false,
    });
    Patient.hasMany(Consultation, {
        as: 'consultations',
        foreignKey: 'patientId',
        constraints: false,
    });
    //
    Patient.hasMany(Analysis, {
        as: 'analyzes',
        foreignKey: 'patientId',
        constraints: false,
    });
    //
    Chat.hasMany(Message, {
        as: 'messages',
        foreignKey: 'chatId',
        constraints: false,
    });
    Chat.belongsTo(Patient, {
        as: 'patient',
        foreignKey: 'patientId',
        constraints: false,
    });
    Chat.belongsTo(Doctor, {
        as: 'doctor',
        foreignKey: 'doctorId',
        constraints: false,
    });
    Message.hasMany(MediaFile, {
        as: 'files',
        foreignKey: 'messageId',
        constraints: false,
    });
    Message.belongsTo(User, {
        as: 'user',
        foreignKey: 'authorId',
        constraints: false,
    });
};
