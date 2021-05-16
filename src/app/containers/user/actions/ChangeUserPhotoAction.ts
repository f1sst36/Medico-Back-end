import { Doctor } from '../../../containers/doctor/models';
import { Patient } from '../../../containers/patient/models/Patient';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { doctorRepository } from '../../../containers/doctor/repositories/DoctorRepository';
import { patientRepository } from '../../../containers/patient/repositories/PatientRepository';
import { FileStorage } from '../../../ship/helper';
import { userRepository } from '../repositories/UserRepository';

class ChangeUserPhotoAction extends CoreAction {
    public run = async (userId: number, userType: string, file: any): Promise<IResult> => {
        let patient: Patient;
        let doctor: Doctor;

        let pathToFileImage: string;
        if (userType === 'patient') {
            patient = await patientRepository.getPatientForChangeAvatar(userId);
            let user = await userRepository.getUserForChangeAvatar(userId);

            if (!patient || !user) {
                return {
                    error: 1,
                    message: 'Ошибка загрузки фото',
                };
            }

            try {
                pathToFileImage = await FileStorage.moveFile(file);

                await user.update({
                    avatar: pathToFileImage,
                });
                await patient.update({
                    avatar: pathToFileImage,
                });
            } catch (e) {
                return {
                    error: 1,
                    message: 'Ошибка загрузки фото',
                };
            }
        } else if (userType === 'doctor') {
            doctor = await doctorRepository.getDoctorForChangePhoto(userId);
            let user = await userRepository.getUserForChangeAvatar(userId);

            if (!doctor) {
                return {
                    error: 1,
                    message: 'Ошибка загрузки фото',
                };
            }

            try {
                pathToFileImage = await FileStorage.moveFile(file);

                await user.update({
                    avatar: pathToFileImage,
                });
                await doctor.update({
                    photo: pathToFileImage,
                });
            } catch (e) {
                return {
                    error: 1,
                    message: 'Ошибка загрузки фото',
                };
            }
        } else
            return {
                error: 1,
                message: 'Ошибка обновления фото',
            };

        return {
            error: 0,
            data: pathToFileImage,
        };
    };
}

export const changeUserPhotoAction = new ChangeUserPhotoAction();
