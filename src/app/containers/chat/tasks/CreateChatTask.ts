import { CoreTask } from '../../../ship/core/task/CoreTask';
import { Chat } from '../models/Chat';

interface IParams {
    doctorId: number;
    patientId: number;
}

class CreateChatTask extends CoreTask {
    public run = async (fields: IParams): Promise<Chat> => {
        try {
            return await Chat.create(fields);
        } catch (e) {
            return null;
        }
    };
}

export const createChatTask = new CreateChatTask();
