import { Model } from "sequelize";

export abstract class CoreModel extends Model {
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
}
