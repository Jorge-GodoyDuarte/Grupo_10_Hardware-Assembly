'use strict';
const array = require('../../data/payments.json');
const payments= array.map((metohd)=>{
  return {
    metohd/* ,
    createdAt: new Date() */
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Payments', payments, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Payments', null, {});
    
  }
};