module.exports = (sequelize, DataTypes) => {
    let alias = 'Order';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        status_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        order_date : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        payment_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        amount : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    };

    let config = {
        timestamps: true,
        underscored: true,
    };

    const Order = sequelize.define(alias, cols , config)
       
    /*         ASOCIACIONES       */

        Order.associate = (models) => {
            Order.belongsTo(models.User, {
                as :"user",
                foreingKey : "user_id"
            })
        };
        Order.associate = (models) => {
            Order.belongsTo(models.Product, {
                as :"product",
                foreingKey : "product_id"
            })
        };
        Order.associate = (models) => {
            Order.belongsTo(models.Status, {
                as :"status",
                foreingKey : "status_id"
            })
        };
        Order.associate = (models) => {
            Order.belongsTo(models.Payment, {
                as :"payment",
                foreingKey : "payment_id"
            })
        }
    return Order
}