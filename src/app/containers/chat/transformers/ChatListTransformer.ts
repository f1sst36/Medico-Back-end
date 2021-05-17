import { Doctor } from '../../doctor/models';
import { Patient } from '../../patient/models/Patient';
import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { Chat } from '../models/Chat';

interface ITransformedChat {
    id: number;
    isOpenedAccess: boolean;
    interlocutor: {
        id: number;
        name: string;
        surname: string;
        avatar: string;
        specialties?: Array<{
            id: number;
            name: string;
        }>;
    };
    messages: Array<{
        id: number;
        text: string;
        createdAt: Date;
        user: {
            id: number;
            avatar: string;
        };
    }>;
}

class ChatListTransformer extends CoreTransformer {
    public transform = (chats: Array<Chat>): Array<ITransformedChat> => {
        const result: Array<ITransformedChat> = [];
        
        for (let i = 0; i < chats.length; i++) {
            const interlocutor: Patient | Doctor = chats[i].hasOwnProperty('patient')
                ? chats[i].patient
                : chats[i].doctor;

            const transformedChat: ITransformedChat = {
                id: chats[i].getDataValue('id'),
                isOpenedAccess: chats[i].getDataValue('isOpenedAccess'),
                interlocutor: {
                    id: interlocutor.getDataValue('id'),
                    name: interlocutor.user.getDataValue('name'),
                    surname: interlocutor.user.getDataValue('surname'),
                    avatar: interlocutor.user.getDataValue('avatar'),
                },
                messages: [],
            };

            if (
                interlocutor.hasOwnProperty('doctorSpecialtiesLink') &&
                interlocutor instanceof Doctor
            ) {
                transformedChat.interlocutor.specialties = [];

                for (let i = 0; i < interlocutor.doctorSpecialtiesLink.length; i++) {
                    transformedChat.interlocutor.specialties.push({
                        id: interlocutor.doctorSpecialtiesLink[i].specialty.getDataValue('id'),
                        name: interlocutor.doctorSpecialtiesLink[i].specialty.getDataValue('name'),
                    });
                }
            }

            if (chats[i].messages[0])
                transformedChat.messages.push({
                    id: chats[i].messages[0].getDataValue('id'),
                    text: chats[i].messages[0].getDataValue('text'),
                    createdAt: chats[i].messages[0].getDataValue('createdAt'),
                    user: {
                        id: chats[i].messages[0].user.getDataValue('id'),
                        avatar: chats[i].messages[0].user.getDataValue('avatar'),
                    },
                });

            result.push(transformedChat);
        }

        return result;
    };
}

export const chatListTransformer = new ChatListTransformer();
