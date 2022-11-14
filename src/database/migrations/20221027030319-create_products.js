'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        references : {
          model : {
            tableName : 'Brands'
          },
          key : 'id'
        }
      },
      categories_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        references : {
          model : {
            tableName : 'Categories',
          },
          
        }
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: 'Sin descripción'
      },
      discount: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultvalue: 0
      } ,
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
/*       createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      } */
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};