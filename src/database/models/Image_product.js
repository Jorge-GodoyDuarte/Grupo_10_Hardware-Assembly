module.exports = (sequelize, DataTypes) => {
    let alias = 'Image_product';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'defaultProduct.jpg'
        }
    };
    let config = {
        timestamps: true,
        underscored: true,
    }
    const Image_product = sequelize.define(alias, cols , config)
           
    /*         ASOCIACIONES       */


    return Image_product
}