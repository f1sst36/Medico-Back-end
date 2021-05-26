import { CoreAction } from '../../../ship/core/action/CoreAction';
import { INewVoiceMessage } from '../interfaces';

class LoadVoiceMessageAction extends CoreAction {
    public run = (voiceMessage: INewVoiceMessage) => {
        //
    };
}

export const loadVoiceMessageAction = new LoadVoiceMessageAction();
