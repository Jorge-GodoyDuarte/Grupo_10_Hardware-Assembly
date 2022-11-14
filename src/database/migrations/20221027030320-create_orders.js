'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        references : {
          model : {
            tableName : 'Products'
          },
          key : 'id'
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        references : {
          model : {
            tableName : 'Status'
          },
          key : 'id'
        }
      },
      order_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      payment_id: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Payments'
          },
          key : 'id'
        }
      },
      amount:{
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Orders');
  }
};