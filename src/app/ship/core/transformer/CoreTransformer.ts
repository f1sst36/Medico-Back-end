export interface IResponse {
    error: number;
    data: Object;
    message?: string;
}

export class CoreTransformer {
    public getSimpleSuccessResponse(data: Object) {
        const successSimpleResponse: IResponse = {
            error: 0,
            data: data,
        };
        return successSimpleResponse;
    }

    public getErrorResponse(errorMessage: string, errorObject: Object | null = null) {
        const errorResponse: IResponse = {
            error: 1,
            data: errorObject,
            message: errorMessage,
        };
        return errorResponse;
    }
}

export const coreTransformer = new CoreTransformer();
