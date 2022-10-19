module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED.UNIQUE,
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
    }
}