module.exports = (sequelize, DataTypes) => {
    let alias = 'Role';
    let cols = {
        id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            unique: true,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        underscored: true,
    }
    const Role = sequelize.define(alias, cols , config)
        
    /*         ASOCIACIONES       */

 /*    Role.associate = (models) => {
        Role.hasMany(models.User, {
            as :"user",
            foreingKey : "rol_id"
        })
    } */

    return Role
}