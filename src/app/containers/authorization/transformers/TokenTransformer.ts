import { CoreTransformer } from "../../../ship/core/transformer/CoreTransformer";

interface IToken {
    accessToken: string;
    tokenType: string;
}

class TokenTransformer extends CoreTransformer {
    public transform = (token): Object => {
        const response: IToken = {
            accessToken: token,
            tokenType: "Bearer",
        };
        return this.getSimpleSuccessResponse(response);
    };
}

export const tokenTransformer = new TokenTransformer();
