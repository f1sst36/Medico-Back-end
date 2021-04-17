import { Patient } from '../../../containers/patient/models/Patient';
import { User } from '../../../containers/user/models/User';
import { Op } from 'sequelize';
import { CoreRepository } from '../../../ship/core/repository/CoreRepository';

import { Review } from '../models';

class ReviewRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Review;
    }

    public getOldReviewsLessThanId = (reviewId: number, doctorId: number, count: number) => {
        try {
            const reviews = Review.findAll({
                where: {
                    doctorId: doctorId,
                    id: {
                        [Op.lt]: reviewId,
                    },
                },
                include: [
                    {
                        model: Patient,
                        as: 'patient',
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['name', 'surname'],
                            },
                        ],
                        attributes: ['avatar'],
                    },
                ],
                attributes: ['id', 'text', 'estimation', 'createdAt'],
                limit: count,
                order: [['id', 'DESC']],
            });
            return reviews;
        } catch (error) {
            return null;
        }
    };
}

export const reviewRepository = new ReviewRepository();
