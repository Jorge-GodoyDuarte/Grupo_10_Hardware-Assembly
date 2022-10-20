module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        brand_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        name : {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        price_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        discount_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        image_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        description : {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        categories_id : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        }
    };
    let config = {
        timestamps: true,
        underscored: true,
    }
    const Product = sequelize.define(alias, cols , config)
        
    return Product
}