'use strict';
const array = require('../../data/category.json');
const categories= array.map(({name,image})=>{
  return {
    name,
    image/* ,
    createdAt: new Date() */
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Categories', categories, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};