import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { Review } from '../models';
import { doctorRepository } from '../repositories/DoctorRepository';
import { calculateDoctorsRatingTask } from '../tasks/CalculateDoctorsRatingTask';

class AddReviewToDoctorAction extends CoreAction {
    public run = async (
        doctorId: number,
        patientId: number,
        text: string,
        estimation: number
    ): Promise<IResult> => {
        let newReview: Review;

        const doctor = await doctorRepository.isExistDoctorById(doctorId);
        if (!doctor)
            return {
                error: 2,
                message: 'Доктор не найден',
            };

        try {
            newReview = await Review.create({
                patientId: patientId,
                doctorId: doctorId,
                text: text,
                estimation: estimation,
            });

            calculateDoctorsRatingTask.run(doctorId);
        } catch (e) {
            console.log('Ошибка добавления отзыва', e);

            return {
                error: 1,
                message: 'Ошибка добавления отзыва',
            };
        }

        return {
            error: 0,
            data: newReview,
        };
    };
}

export const addReviewToDoctorAction = new AddReviewToDoctorAction();
