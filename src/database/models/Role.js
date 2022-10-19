module.exports = (sequelize, DataTypes) => {
    let alias = 'Role';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED.UNIQUE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }
}