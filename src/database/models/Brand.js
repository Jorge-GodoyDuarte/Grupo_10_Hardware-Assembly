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

    return Brand
}