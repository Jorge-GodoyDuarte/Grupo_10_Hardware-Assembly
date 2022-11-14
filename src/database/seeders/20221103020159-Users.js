"use strict";
const array = require("../../data/users.json");
const users = array.map(
  ({firstname, lastname, email, password, role_id,city,payment_id,phone,street}) => {
    return {
      firstname,
      lastname,
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
​
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};