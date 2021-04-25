import { Patient } from '../../containers/patient/models/Patient';
import { Doctor, DoctorSpecialtiesLink, Specialty } from '../../containers/doctor/models';
import { User } from '../../containers/user/models/User';
import { Review } from '../../containers/doctor/models/Review';
import { Consultation } from '../../containers/consultation/models/Consultation';
import { CommunicationMethod } from '../../containers/consultation/models/CommunicationMethod';
import { Analysis } from '../../containers/patient/models/Analysis';

export const linkModels = () => {
    Patient.hasOne(User, { as: 'user', foreignKey: 'id', constraints: false });
    Doctor.hasOne(User, { as: 'user', foreignKey: 'id', constraints: false });
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
};
