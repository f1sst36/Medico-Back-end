import { CoreTask, IResult } from '../../../ship/core/task/CoreTask';
import { reviewRepository } from '../repositories/ReviewRepository';

class GetOldReviewsTask extends CoreTask {
    public run = async (reviewId: number, doctorId: number, count: number): Promise<IResult> => {
        const reviews = await reviewRepository.getOldReviewsLessThanId(reviewId, doctorId, count);
        const countOfReviews = await reviewRepository.getCountOfReviewsFromDoctor(doctorId);

        if (!reviews)
            return {
                error: 1,
                message: 'Ошибка получения отзывов',
            };

        if (!reviews.length)
            return {
                error: 2,
                message: 'Отзывы не найдены',
            };

        return {
            error: 0,
            data: {
                count: countOfReviews,
                items: reviews,
            },
            message: '',
        };
    };
}

export const getOldReviewsTask = new GetOldReviewsTask();
