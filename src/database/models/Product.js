"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Brand, {
                as: "brand",
                foreignKey: "brand_id",
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });
            Product.belongsTo(models.Category, {
                as: "category",
                foreignKey: "categories_id",
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });
            Product.hasMany(models.Image, {
                as: "images",
                foreignKey: "product_id",
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }); 
            
        }
    }
    Product.init(
        {
            brand_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            categories_id: DataTypes.INTEGER,
            description:DataTypes.STRING,
            discount:DataTypes.INTEGER,
            price:DataTypes.INTEGER,
          /*   createdAt: {
                type: DataTypes.DATE,
              }, */
        },
        {
            sequelize,
            modelName: "Product",
            paranoid : true,
            timestamps : false
        }
    );
    return Product;
};
