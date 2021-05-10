import { CoreTransformer } from '../../../ship/core/transformer/CoreTransformer';

interface ITransformedUser {
    id: number;
    name: string;
    surname: string;
    middlename?: string;
    sex: string;
    birthDate: string;
    phone: string;
    email: string;
    isActivated: true;
    acceptedUserAgreement: true;
    userType: string;

    additionalData: any;
}

// Лютый говнокод. Исправь потом!
class UserTransformer extends CoreTransformer {
    public transform = (user: any): ITransformedUser => {
        let transformedUser: ITransformedUser;

        const mainUserData = user.dataValues.user.dataValues;
        mainUserData.id = user.dataValues.id;
        delete user.dataValues.user;
        const additionalData = user.dataValues;

        transformedUser = mainUserData;
        
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

            if (transformedUser.userType === 'doctor') {
                transformedUser.additionalData.specialties = [];
                for (
                    let i = 0;
                    i < transformedUser.additionalData.doctorSpecialtiesLink.length;
                    i++
                ) {
                    transformedUser.additionalData.specialties.push({
                        id: transformedUser.additionalData.doctorSpecialtiesLink[i].specialty.id,
                        name:
                            transformedUser.additionalData.doctorSpecialtiesLink[i].specialty.name,
                        slug:
                            transformedUser.additionalData.doctorSpecialtiesLink[i].specialty.slug,
                    });
                }

                delete transformedUser.additionalData.doctorSpecialtiesLink;
            }
        } else transformedUser.additionalData = null;

        return transformedUser;
    };
}

export const userTransformer = new UserTransformer();
