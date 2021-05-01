import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Review } from '../models';

interface TransformedReview {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    text: string;
    estimation: number;
    createdAt: Date;
}

class OldReviewsTransformer extends CoreTransformer {
    public transform = (reviews: Array<Review>): Array<TransformedReview> => {
        let result: Array<TransformedReview> = [];

        reviews.forEach((review: Review) => {
            const transformendReview: TransformedReview = {
                id: review.getDataValue('id'),
                avatar: review.patient.getDataValue('avatar'),
                name: review.patient.user.getDataValue('name'),
                surname: review.patient.user.getDataValue('surname'),
                text: review.getDataValue('text'),
                estimation: review.getDataValue('estimation'),
                createdAt: review.getDataValue('createdAt'),
            };

            result.push(transformendReview);
        });

        return result;
    };
}

export const oldReviewsTransformer = new OldReviewsTransformer();
