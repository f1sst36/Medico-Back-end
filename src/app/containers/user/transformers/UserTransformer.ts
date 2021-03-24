import { CoreTransformer } from "../../../ship/core/transformer/CoreTransformer";

interface ITransformedUser {
    id: Number;
    name: String;
    surname: String;
    middlename?: String;
    sex: String;
    birthDate: String;
    phone: String;
    email: String;
    isActivated: true;
    acceptedUserAgreement: true;
    userType: String;

    additionalData: any;
}

class UserTransformer extends CoreTransformer {
    public transform = (user: any): ITransformedUser => {
        let transformedUser: ITransformedUser;

        const mainUserData = user.dataValues.user.dataValues;
        mainUserData.id = user.dataValues.id;
        delete user.dataValues.user;
        const additionalData = user.dataValues;

        transformedUser = mainUserData;

        // if (transformedUser.userType === "doctor") {
        if (
            (additionalData.IIN &&
                additionalData.diploma &&
                additionalData.summary &&
                additionalData.photo &&
                additionalData.experience) ||
            additionalData.isFullData
        ) {
            transformedUser.additionalData = additionalData;
            delete transformedUser.additionalData.id;
        } else transformedUser.additionalData = null;
        // }
        // else {
        //     if (additionalData.isFullData) {
        //         transformedUser.additionalData = additionalData;
        //         delete transformedUser.additionalData.id;
        //     } else transformedUser.additionalData = null;
        // }

        // transformedUser.additionalData = additionalData;
        // delete transformedUser.additionalData.id;

        return transformedUser;
    };
}

export const userTransformer = new UserTransformer();
