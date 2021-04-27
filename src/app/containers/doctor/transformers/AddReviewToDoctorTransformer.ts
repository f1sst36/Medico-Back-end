import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Review } from '../models';

interface IReview {
    id: Number;
    text: String;
    estimation: Number;
    createdAt: Date;
}

class AddReviewToDoctorTransformer extends CoreTransformer {
    public transform = (review: Review): IReview => {
        return {
            id: review.getDataValue('id'),
            text: review.getDataValue('text'),
            estimation: review.getDataValue('estimation'),
            createdAt: review.getDataValue('createdAt'),
        };
    };
}

export const addReviewToDoctorTransformer = new AddReviewToDoctorTransformer();
