import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { userRepository } from '../repositories/UserRepository';

interface IParam {
    name?: string;
    surname?: string;
    middleName?: string;
    birthDate?: Date;
    sex?: string;
    email?: string;
}

class ChangeUserInfoAction extends CoreAction {
    public run = async (data: IParam, userId: number): Promise<IResult> => {
        if (
            !data.name &&
            !data.surname &&
            !data.middleName &&
            !data.birthDate &&
            !data.sex &&
            !data.email
        ) {
            return {
                error: 1,
                message: 'Отсутствуют данные для изменения',
            };
        }

        const user = await userRepository.getUserByFields({ id: userId });

        if (!user)
            return {
                error: 2,
                message: 'Пользователь не найден',
            };

        try {
            await user.update(data);
        } catch (e) {
            return {
                error: 3,
                message: 'Ошибка при обновлении пользователя',
            };
        }

        return {
            error: 0,
            data: user,
            message: '',
        };
    };
}

export const changeUserInfoAction = new ChangeUserInfoAction();
