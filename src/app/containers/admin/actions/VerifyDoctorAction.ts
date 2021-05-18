import { doctorRepository } from '../../doctor/repositories/DoctorRepository';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';

class VerifyDoctorAction extends CoreAction {
    public run = async (doctorId: number): Promise<IResult> => {
        let doctors;
        try {
            doctors = await doctorRepository.verifyDoctor(doctorId);
            console.log(doctors);
        } catch (e) {
            return {
                error: 1,
                message: 'Ошибка обновления пользователя',
            };
        }

        let message: string;
        try {
            message = doctors && doctors[0] > 0 ? 'Врач верифицирован' : 'Врач не найден';
        } catch (e) {
            console.log('VerifyDoctorAction', e);
            message = 'Хз что произошло. Смотри логи';
        }

        return {
            error: 0,
            data: null,
            message: message,
        };
    };
}

export const verifyDoctorAction = new VerifyDoctorAction();
