import { FileStorage } from '../../../ship/helper';
import { CoreAction, IResult } from '../../../ship/core/action/CoreAction';
import { INewVoiceMessage } from '../interfaces';
import { messageRepository } from '../repositories/MessageRepository';
import { mediaFileRepository } from '../repositories/MediaFileRepository';
import { userRepository } from '../../../containers/user/repositories/UserRepository';
import { app } from '../../../../index';
import { socketChat } from '../../../ship/socket-io/SocketChat';

class LoadMediaMessageAction extends CoreAction {
    public run = async (voiceMessage: INewVoiceMessage): Promise<IResult> => {
        // загрузить файл на бек
        const pathToFile = await FileStorage.moveFile(voiceMessage.file);

        let newMessage, newFile, user;
        try {
            newMessage = await messageRepository.appendMessage({
                chatId: voiceMessage.chatId,
                authorId: voiceMessage.authorId,
                text: null,
            });

            newFile = await mediaFileRepository.appendMediaFile(
                newMessage.getDataValue('id'),
                voiceMessage.file.name,
                voiceMessage.file.size,
                voiceMessage.type,
                pathToFile
            );

            user = await userRepository.getUserForMessage(newMessage.getDataValue('authorId'));
        } catch (e) {
            console.log(e);
            return {
                error: 1,
            };
        }

        const emitData = {
            id: newMessage.getDataValue('id'),
            chatId: newMessage.getDataValue('chatId'),
            text: newMessage.getDataValue('text'),
            createdAt: newMessage.getDataValue('createdAt'),
            uuid: voiceMessage.uuid || null,
            file: {
                name: newFile.getDataValue('name'),
                size: newFile.getDataValue('size'),
                path: newFile.getDataValue('path'),
                type: newFile.getDataValue('type'),
            },
            user: {
                id: user.getDataValue('id'),
                avatar: user.getDataValue('avatar'),
                name: user.getDataValue('name'),
            },
        };
        
        // броадкастим успех
        // TODO броадкасти в комнату потом
        // app.io.to(emitData.chatId).emit(socketChat.NEW_MESSAGE_SUCCESS, emitData);
        app.io.emit(socketChat.NEW_MESSAGE_SUCCESS, emitData);

        return {
            error: 0,
        };
    };
}

export const loadMediaMessageAction = new LoadMediaMessageAction();
