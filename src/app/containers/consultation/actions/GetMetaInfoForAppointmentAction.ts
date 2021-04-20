import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { doctorRepository } from '../../../containers/doctor/repositories/DoctorRepository';
import { reviewRepository } from '../../../containers/doctor/repositories/ReviewRepository';
import { communicationMethodRepository } from '../repositories/CommunicationMethodRepository';

class GetMetaInfoForAppointmentAction extends CoreAction {
    public run = async (doctorId: number): Promise<IResult> => {
        const doctor = await doctorRepository.getDoctorForAppointment(doctorId);
        if (!doctor)
            return {
                error: 1,
                message: 'Данные не найдены',
            };
        const countOfReviews = await reviewRepository.getCountOfReviewsFromDoctor(doctorId);
        const communicationMethods = await communicationMethodRepository.getAllMethods();
        if (!countOfReviews || !communicationMethods.length)
            return {
                error: 1,
                message: 'Данные не найдены',
            };

        return {
            error: 0,
            data: {
                doctor: doctor,
                countOfReviews: countOfReviews,
                communicationMethods: communicationMethods,
            },
            message: '',
        };
    };
}

export const getMetaInfoForAppointmentAction = new GetMetaInfoForAppointmentAction();
