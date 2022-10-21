module.exports = (sequelize, DataTypes) => {
    let alias = 'Brand';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        underscored: true,
    }
    const Brand = sequelize.define(alias, cols , config)
       
    /*         ASOCIACIONES       */

    Brand.associate = (models) => {
        Brand.hasMany(models.Discount, {
            as: "discount",
            foreingKey : "brand_id"
        })
    };


    Brand.associate = (models) => {
        Brand.hasMany(models.Product, {
            as :"product",
            foreingKey : "brand_id"
        })
    };
    return Brand
}