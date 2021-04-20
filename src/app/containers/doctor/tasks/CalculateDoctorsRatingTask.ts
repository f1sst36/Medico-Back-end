import { CoreTask } from '../../../ship/core/task/CoreTask';
import { Review } from '../models';
import { doctorRepository } from '../repositories/DoctorRepository';

class CalculateDoctorsRatingTask extends CoreTask {
    // Если у врача отзывов больше чем 10, то ему присваевается рейтинг
    private limitReviewsCount: number = 10;

    public run = async (doctorId: number): Promise<undefined> => {
        const doctorWithReviews = await doctorRepository.getDoctorWithAllReviews(doctorId);
        if (doctorWithReviews === null) return;

        if (doctorWithReviews.reviews.length < this.limitReviewsCount) return;

        let sumOfEstimations = 0;
        doctorWithReviews.reviews.forEach(
            (review: Review) => (sumOfEstimations += review.estimation)
        );

        const newDoctorsRating = sumOfEstimations / doctorWithReviews.reviews.length;

        try {
            doctorWithReviews.update({
                rating: newDoctorsRating,
            });
        } catch (e) {
            console.log('Не удалось посчитать рейтинг врача', e);
        }
    };
}

export const calculateDoctorsRatingTask = new CalculateDoctorsRatingTask();
