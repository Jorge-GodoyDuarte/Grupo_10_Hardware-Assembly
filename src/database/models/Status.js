module.exports = (sequelize, DataTypes) => {
    let alias = 'Status';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED.UNIQUE,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        send_date : {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        delivery_status : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
}