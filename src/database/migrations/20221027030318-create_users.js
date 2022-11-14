'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      payment_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        references : {
          model : {
            tableName : 'Payments'
          },
          key : 'id'
        }
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role_id: {
        type: Sequelize.INTEGER,
        onUpdate : 'CASCADE',
        references : {
          model : {
            tableName : 'Roles'
          },
          key : 'id'
        }
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};