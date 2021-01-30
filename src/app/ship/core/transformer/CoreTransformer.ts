export interface IResponse {
    error: Number;
    data: Object;
    message?: String;
}

export class CoreTransformer {
    public getSimpleSuccessResponse(message: String, data: Object | null = null) {
        const successSimpleResponse: IResponse = {
            error: 0,
            data: data,
            message: message,
        };
        return successSimpleResponse;
    }

    public getErrorResponse(errorMessage: String, errorObject: Object | null = null) {
        const errorResponse: IResponse = {
            error: 1,
            data: errorObject,
            message: errorMessage,
        };
        return errorResponse;
    }
}

export const coreTransformer = new CoreTransformer();
