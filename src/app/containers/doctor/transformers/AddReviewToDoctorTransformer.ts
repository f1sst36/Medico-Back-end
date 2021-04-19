import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Review } from '../models';

interface IReview {
    id: Number;
    name: String;
    surname: String;
    avatar: String;
    text: String;
    estimation: Number;
    createdAt: Date;
}

class AddReviewToDoctorTransformer extends CoreTransformer {
    public transform = (review: Review, name: string, surname: string, avatar: string): IReview => {
        return {
            id: review.getDataValue('id'),
            name: name,
            surname: surname,
            avatar: avatar,
            text: review.getDataValue('text'),
            estimation: review.getDataValue('estimation'),
            createdAt: review.getDataValue('createdAt'),
        };
    };
}

export const addReviewToDoctorTransformer = new AddReviewToDoctorTransformer();
