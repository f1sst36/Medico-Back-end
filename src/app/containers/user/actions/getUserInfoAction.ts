import { reviewRepository } from '../../../containers/doctor/repositories/ReviewRepository';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { Doctor } from '../../doctor/models';
import { doctorRepository } from '../../doctor/repositories/DoctorRepository';
import { Patient } from '../../patient/models/Patient';
import { patientRepository } from '../../patient/repositories/PatientRepository';

class GetUserInfoAction extends CoreAction {
    public run = async (userId: number, userType: string): Promise<IResult> => {
        let user: Doctor | Patient;
        let countOfReviews: number;
        if (userType === 'patient') {
            user = await patientRepository.getPatientById(userId);
        } else if (userType === 'doctor') {
            countOfReviews = await reviewRepository.getCountOfReviewsFromDoctor(userId);
            user = await doctorRepository.getDoctorById(userId);
        } else
            return {
                error: 1,
                data: null,
                message: 'Ошибка получения информации',
            };

        // try {
        //     // Тут можно проверять userType в токене и не делать 2 запроса для доктора
        //     user = await patientRepository.getPatientById(userId);
        //     if (!user) user = await doctorRepository.getDoctorById(userId);
        // } catch (_) {
        //     return { error: 1, data: null, message: 'Ошибка поиска пользователя' };
        // }

        if (!user) return { error: 1, data: null, message: 'Пользователь не найден' };

        return {
            error: 0,
            data: { user: user, countOfReviews: countOfReviews },
            message: '',
        };
    };
}

export const getUserInfoAction = new GetUserInfoAction();
