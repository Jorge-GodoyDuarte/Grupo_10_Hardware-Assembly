"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Payment, {
                as: "metodos",
                foreignKey: "payment_id",
            });
            User.belongsTo(models.Role, {
                as: "roles",
                foreignKey: "role_id",
            });
        }
    }
    User.init(
        {
            city: DataTypes.STRING,
            email: DataTypes.STRING,
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            password: DataTypes.STRING,
            payment_id:DataTypes.INTEGER,
            phone:DataTypes.INTEGER,
            role_id:DataTypes.INTEGER,
            street: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "User",
            paranoid : true,
            timestamps: false
        }
    );
    return User;
};