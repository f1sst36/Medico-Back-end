import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import express from 'express';
import { Response } from 'express';
import { CoreController } from '../../../ship/core/controller/CoreController';
import { getOldMessagesValidator } from '../validators/getOldMessagesValidator';
import { getMessagesForChatAction } from '../actions/GetMessagesForChatAction';

export class MessageController extends CoreController {
    constructor() {
        super();
        this.prefix = '/chat/message';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + '/list', getOldMessagesValidator, this.getOldMessages);
    }

    // Получить сообщения, id которых меньше чем переданный. Если id не передан - отдай N самых новых сообщений
    public getOldMessages = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await getMessagesForChatAction.run(
            req.user.id,
            +req.query.chatId,
            +req.query.count,
            req.query.lastMessageId ? +req.query.lastMessageId : null
        );

        if (result.error)
            return res
                .status(result.error === 1 ? 403 : 422)
                .json(coreTransformer.getErrorResponse(result.message));

        return res.status(200).json(coreTransformer.getSimpleSuccessResponse('', result.data));
    };
}
