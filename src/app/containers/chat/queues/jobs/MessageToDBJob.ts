import { userRepository } from '../../../user/repositories/UserRepository';
import { Job } from 'bull';
import { Message } from '../../models/Message';
import { messageRepository } from '../../repositories/MessageRepository';
import { User } from '../../../user/models/User';

class MessageToDBJob {
    public run = async (
        job: Job
    ): Promise<{
        user: User;
        message: Message;
        passingData: {
            uuid: string;
        };
    }> => {
        // passingData - скозные данные. Приходят от клиента и уходят ему же не влияя на бек никак.
        
        // throw new Error('test error');
        const message = await messageRepository.appendMessage(job.data);
        const user = await userRepository.getUserForMessage(message.authorId);

        return {
            user: user,
            message: message,
            passingData: {
                uuid: job.data.uuid,
            },
        };
    };
}

export const messageToDBJob = new MessageToDBJob();
