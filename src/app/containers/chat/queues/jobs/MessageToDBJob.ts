import { Job } from 'bull';
import { Message } from '../../models/Message';
import { messageRepository } from '../../repositories/MessageRepository';

class MessageToDBJob {
    public run = async (job: Job): Promise<Message> => {
        const message = await messageRepository.appendMessage(job.data);
        return message;
    };
}

export const messageToDBJob = new MessageToDBJob();
