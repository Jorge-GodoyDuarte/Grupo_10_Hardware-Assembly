module.exports = (sequelize, DataTypes) => {
    let alias = 'Status';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
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
    };
    let config = {
        timestamps: true,
        underscored: true,
    }
    const Status = sequelize.define(alias, cols , config)

    /*         ASOCIACIONES       */

    Status.associate = (models) => {
        Status.hasMany(models.Order, {
            as :"order",
            foreingKey : "status_id"
        })
    }
    return Status
}