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
    }> => {
        // throw new Error('test error');
        const message = await messageRepository.appendMessage(job.data);
        const user = await userRepository.getUserForMessage(message.authorId);

        return {
            user: user,
            message: message,
        };
    };
}

export const messageToDBJob = new MessageToDBJob();
