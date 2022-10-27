
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
            defaultValue: 'defaultAvatar.jpg'
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
        underscored: true,
        timestamps: false
    }
    const Product = sequelize.define(alias, cols , config)        
    /*         ASOCIACIONES       */
    Product.associate=(models)=>{
        Product.belongsTo(models.Category,{
            as:'categoria',
            foreignKey:'categories_id'
        })};

    Product.associate = (models) => {
        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignkey : "brand_id"
        })
    };
    Product.associate = (models) => {
        Product.belongsTo(models.Price, {
            as: "price",
            foreignkey : "price_id"
        })
    };
    Product.associate = (models) => {
        Product.belongsTo(models.Discount, {
            as: "discount",
            foreignkey : "discount_id"
        })
    };
/*     Product.associate = (models) => {
        Product.belongsTo(models.Image_product, {
            as: "image",
            foreingKey : "image_id"
        })
    }; */

    return Product
}