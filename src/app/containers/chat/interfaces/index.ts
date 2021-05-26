export interface INewMessage {
    chatId: number;
    authorId?: number;
    text: string;
    uuid?: string;
}

export interface INewVoiceMessage {
    chatId: number;
    authorId?: number;
    file: File | any;
    type: string;
    uuid?: string;
}
