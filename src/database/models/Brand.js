module.exports = (sequelize, DataTypes) => {
    let alias = 'Brand';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED.UNIQUE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }
}