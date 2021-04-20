import { CoreRepository } from '../../../ship/core/repository/CoreRepository';

import { CommunicationMethod } from '../models/CommunicationMethod';

class CommunicationMethodRepository extends CoreRepository {
    constructor() {
        super();
        this.model = CommunicationMethod;
    }

    public getAllMethods = (): Promise<Array<CommunicationMethod>> => {
        try {
            const result = this.model.findAll({
                attributes: ['id', 'method'],
            });
            return result;
        } catch (error) {
            return null;
        }
    };
}

export const communicationMethodRepository = new CommunicationMethodRepository();
