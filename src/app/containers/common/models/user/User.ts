import { Association, DataTypes, Model } from "sequelize";

export class User extends Model {
    public readonly id: number;
    public name: string;
    public age: number;
    public createdAt: Date;
    public updatedAt: Date;

    getSomeData() {
        console.log(this.name + this.age);
    }

    // static associate(models) {
    //     User.belongsTo(models.Post, {
    //         foreignKey: "userId",
    //         as: "user",
    //     });
    // }

    // public static associations: {
    //     projects: Association<User, Project>;
    // };
}

export const userSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    age: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
};
