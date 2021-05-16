import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Response } from 'express';
import { CoreController } from '../../../ship/core/controller/CoreController';
import { getChatListAction } from '../actions/GetChatListAction';
import { chatListTransformer } from '../transformers/ChatListTransformer';

export class ChatController extends CoreController {
    constructor() {
        super();
        this.prefix = '/chat';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + '/list', this.getChatList);
    }

    // Получить список чатов для доктора и пациента. Каждый чат идет с крайним сообщением в нем
    public getChatList = async (req: any, res: Response): Promise<Response> => {
        const result = await getChatListAction.run(req.user.id, req.user.user.userType);

        if (result.error)
            return res.status(422).json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    chatListTransformer.transform(result.data)
                )
            );
    };
}
