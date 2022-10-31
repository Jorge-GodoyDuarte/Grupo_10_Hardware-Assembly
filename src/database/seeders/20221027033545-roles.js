'use strict';
const array = require('../../data/roles.json');
const roles= array.map((name)=>{
  return {
    name/* ,
    createdAt: new Date() */
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Roles', roles, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Roles', null, {});
    
  }
};