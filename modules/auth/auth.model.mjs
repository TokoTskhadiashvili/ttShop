import { DataTypes } from "sequelize";

const createUserModel = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("BUYER", "SELLER"),
            defaultValue: "BUYER"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: true
    });

    return User;
}

export default createUserModel;