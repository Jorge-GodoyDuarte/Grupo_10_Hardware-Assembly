"use strict";
const array = require("../../data/users.json");
const users = array.map(
  ({firstName, lastName, email, password, role_id,city,payment_id,phone,street}) => {
    return {
      firstName,
      lastName,
      email,
      password,
      role_id,
      city,
      payment_id,
      phone,
      street
    };
  }
);
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};