module.exports = (sequelize, DataTypes) => {
    let alias = 'Payment';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED.UNIQUE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        method : {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }
}