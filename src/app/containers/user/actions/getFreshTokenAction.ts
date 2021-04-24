import jwt from 'jsonwebtoken';

import { doctorRepository } from '../../doctor/repositories/DoctorRepository';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { patientRepository } from '../../patient/repositories/PatientRepository';
import { Patient } from '../../patient/models/Patient';
import { Doctor } from '../../doctor/models';

class GetFreshTokenAction extends CoreAction {
    public run = async (user: Patient | Doctor): Promise<IResult> => {
        //user - это данные о пользователе из токена

        let fullUser: any;
        if (user.user.userType === 'patient')
            fullUser = await patientRepository.getPatientByIdForToken(user.id);
        else if (user.user.userType === 'doctor')
            fullUser = await doctorRepository.getDoctorByIdForToken(user.id);

        if (!fullUser)
            return {
                error: 2,
                message: 'Пользователь не найден',
            };

        let token;
        try {
            token = await jwt.sign({ _user: fullUser.dataValues }, process.env.TOKEN_SECRET_KEY);
        } catch (e) {
            console.log('GetFreshTokenAction jwt.sign ERROR', e);
            return { error: 1, message: 'Ошибка генерации токена' };
        }

        return { error: 0, data: token };
    };
}

export const getFreshTokenAction = new GetFreshTokenAction();
