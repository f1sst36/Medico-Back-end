import { Doctor } from '../../../containers/doctor/models';
import { Patient } from '../../../containers/patient/models/Patient';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { doctorRepository } from '../../../containers/doctor/repositories/DoctorRepository';
import { patientRepository } from '../../../containers/patient/repositories/PatientRepository';
import { FileStorage } from '../../../ship/helper';

class ChangeUserPhotoAction extends CoreAction {
    public run = async (userId: number, userType: string, file: any): Promise<IResult> => {
        let user: Doctor | Patient;
        // const uploadPath = 'src/app/ship/storage/files/' + file.name;
        // const pathToFileImage = '/storage/files/' + file.name;

        let pathToFileImage: string;
        if (userType === 'patient') {
            user = await patientRepository.getPatientForChangeAvatar(userId);

            try {
                pathToFileImage = await FileStorage.moveFile(file);
                // await file.mv(uploadPath);
                await user.update({
                    avatar: pathToFileImage,
                });
            } catch (e) {
                return {
                    error: 1,
                    message: 'Ошибка загрузки фото',
                };
            }
        } else if (userType === 'doctor') {
            user = await doctorRepository.getDoctorForChangePhoto(userId);

            try {
                pathToFileImage = await FileStorage.moveFile(file);
                // await file.mv(uploadPath);
                await user.update({
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
