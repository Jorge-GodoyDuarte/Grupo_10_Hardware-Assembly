"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.User, {
                as: "usuarios",
                foreignKey: "user_id",
            });
            Order.belongsTo(models.Product, {
                as: "productos",
                foreignKey: "product_id",
            });
            Order.belongsTo(models.Statu, {
                as: "estatus",
                foreignKey: "status_id",
            });
            Order.belongsTo(models.Payment, {
                as: "metodos",
                foreignKey: "payment_id",
            });
        }
    }
    Order.init(
        {
            order_date: DataTypes.DATE,
            amount: DataTypes.INTEGER,
            user_id:DataTypes.INTEGER,
            product_id:DataTypes.INTEGER,
            status_id:DataTypes.INTEGER,
            payment_id:DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Order",
            paranoid : true,
            timestamps: false
        }
    );
    return Order;
};
