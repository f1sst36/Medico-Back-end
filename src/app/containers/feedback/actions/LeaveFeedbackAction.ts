import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { Feedback } from '../model/Feedback';

class LeaveFeedbackAction extends CoreAction {
    public run = async (
        name: string,
        email: string,
        subject: string,
        text: string
    ): Promise<IResult> => {
        let newFeedback: Feedback;
        try {
            newFeedback = await Feedback.create({
                name: name,
                email: email,
                subject: subject,
                text: text,
            });
        } catch (e) {
            return {
                error: 1,
                message: 'Ошибка добавления отзыва',
            };
        }

        if (!newFeedback)
            return {
                error: 1,
                message: 'Ошибка добавления отзыва',
            };

        return {
            error: 0,
            data: null,
            message: 'Отзыв добавлен',
        };
    };
}

export const leaveFeedbackAction = new LeaveFeedbackAction();
