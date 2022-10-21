module.exports  = (sequelize, DataTypes) =>  {
    let alias = "Avatar";
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
            allowNull: false,
            defaultValue: 'defaultAvatar.jpg'
        }
    };

    let config = {
        timestamps: true,
        underscored: true,
    }
    const Avatar = sequelize.define(alias, cols , config)
       
    /*         ASOCIACIONES       */


/*     Avatar.associate = (models) => {
        Avatar.hasMany(models.User, {
            as :"user",
            foreingKey : "avatar_id"
        })
    } */
        
    return Avatar

}