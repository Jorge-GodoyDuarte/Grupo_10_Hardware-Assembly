module.exports = (sequelize, DataTypes) => {
    let alias = 'Price';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        price : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    };
    let config = {
        timestamps: true,
        underscored: true,
    }
    const Price = sequelize.define(alias, cols , config)
    
    /*         ASOCIACIONES       */

    Price.associate = (models) => {
        Price.hasMany(models.Product, {
            as :"order",
            foreingKey : "price_id"
        })
    };



    return Price
}