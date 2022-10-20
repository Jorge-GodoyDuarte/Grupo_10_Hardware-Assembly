module.exports = (sequelize, DataTypes) => {
    let alias = 'Payment';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        method : {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        underscored: true,
    }
    const Payment = sequelize.define(alias, cols , config)
        
    return Payment
}