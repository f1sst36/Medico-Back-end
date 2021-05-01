import { Op } from "sequelize";
import { CoreRepository } from "../../../ship/core/repository/CoreRepository";

import { User } from "../models/User";

class UserRepository extends CoreRepository {
    constructor() {
        super();
        this.model = User;
    }

    getUserByFields = (fields): User => {
        try {
            const result = this.model.findOne({ where: fields });
            return result;
        } catch (error) {
            return null;
        }
    };

    getUserWithSameEmailOrPhone = (email: string, phone: string): User => {
        try {
            const result = this.model.findOne({
                where: {
                    [Op.or]: [{ email: email }, { phone: phone }],
                },
            });
            return result;
        } catch (error) {
            return null;
        }
    };

    getUserByConfirmationToken = (token: string): User => {
        try {
            const user = this.model.findOne({
                where: {
                    confirmationToken: token,
                },
            });
            return user;
        } catch (error) {
            return null;
        }
    };
}

export const userRepository = new UserRepository();
