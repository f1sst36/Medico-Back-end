import { User } from '../../user/models/User';
import { Op } from 'sequelize';
import { CoreRepository } from '../../../ship/core/repository/CoreRepository';
import { INewMessage } from '../interfaces';

import { Message } from '../models/Message';
import { MediaFile } from '../models/MediaFile';

class MessageRepository extends CoreRepository {
    constructor() {
        super();
        this.model = Message;
    }

    public appendMessage = (message: INewMessage): Promise<Message> => {
        return this.model.create({
            chatId: message.chatId,
            authorId: message.authorId,
            text: message.text,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };

    public getMessagesForChat = (
        chatId: number,
        count: number,
        lastMessageId: number = null
    ): Promise<Array<Message>> => {
        const whereCondition: any = {
            chatId: chatId,
            deletedAt: null,
        };

        if (lastMessageId !== null)
            whereCondition.id = {
                [Op.lt]: lastMessageId,
            };

        return this.model.findAll({
            where: whereCondition,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'avatar', 'name'],
                },
                {
                    model: MediaFile,
                    as: 'file',
                    attributes: ['id', 'path', 'type'],
                },
            ],
            attributes: ['id', 'text', 'createdAt'],
            limit: count,
            order: [['id', 'DESC']],
        });
    };
}

export const messageRepository = new MessageRepository();
