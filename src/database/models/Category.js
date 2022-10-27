module.exports = (sequelize, DataTypes) => {
    let alias = 'Category';
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
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        underscored: true,
    }
    const Category = sequelize.define(alias, cols , config)
       
    /*         ASOCIACIONES       */

    Category.associate=(models)=>{
        Category.hasMany(models.Product,{
            as:'product',
            foreignKey:'categories_id'
        })};
    return Category
} 