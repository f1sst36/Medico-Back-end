import { tokenTransformer } from '../../authorization/transformers/TokenTransformer';
import express from 'express';
import { Request, Response } from 'express';
import { CoreController } from '../../../ship/core/controller/CoreController';
import { coreTransformer } from '../../../ship/core/transformer/CoreTransformer';
import { getFreshTokenAction } from '../actions/getFreshTokenAction';
import { getUserInfoAction } from '../actions/getUserInfoAction';
import { userTransformer } from '../transformers/UserTransformer';
import { changeUserInfoValidator } from '../validators/changeUserInfoValidator';
import { changeUserInfoAction } from '../actions/ChangeUserInfoAction';
import { changeUserInfoTransformer } from '../transformers/ChangeUserInfoTransformer';

export class ProfileController extends CoreController {
    constructor() {
        super();
        this.prefix = '/user';
        this.router = express.Router();
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.prefix + '/info', this.getInfo);
        this.router.get(this.prefix + '/fresh-token', this.getFreshToken);
        this.router.post(
            this.prefix + '/change-user-info',
            changeUserInfoValidator,
            this.changeUserInfo
        );
    }

    public getInfo = async (req: any, res: Response): Promise<Response> => {
        const result = await getUserInfoAction.run(req.user.id);

        if (result.error)
            return res.status(422).json(coreTransformer.getErrorResponse(result.message));
        else {
            const transformedUser = userTransformer.transform(result.data);
            return res
                .status(200)
                .json(coreTransformer.getSimpleSuccessResponse('', transformedUser));
        }
    };

    public getFreshToken = async (req: any, res: Response): Promise<Response> => {
        const result = await getFreshTokenAction.run(req.user);

        if (result.error)
            return res
                .status(result.error === 2 ? 404 : 422)
                .json(coreTransformer.getErrorResponse(result.message));

        return res.status(200).json(tokenTransformer.transform(result.data));
    };

    public changeUserInfo = async (req: any, res: Response): Promise<Response> => {
        if (this.validateRequest(req, res)) return;

        const result = await changeUserInfoAction.run(req.body, req.user.id);

        if (result.error)
            return res
                .status(result.error === 1 ? 400 : result.error === 2 ? 404 : 422)
                .json(coreTransformer.getErrorResponse(result.message));

        return res
            .status(200)
            .json(
                coreTransformer.getSimpleSuccessResponse(
                    '',
                    changeUserInfoTransformer.transform(result.data)
                    // result.data
                )
            );
    };
}
