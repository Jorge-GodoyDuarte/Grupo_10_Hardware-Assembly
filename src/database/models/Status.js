'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Statu.init({
    delivery_status: DataTypes.INTEGER,
    send_date: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Statu',
    paranoid : true,
    timestamps: false
  });
  return Statu;
};