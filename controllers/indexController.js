const {loadProducts} = require('../data/db_Module');
module.exports = {
    index: (req, res) => {
      const products=loadProducts();
       return  res.render('index', { 
          title: 'home', 
          products
        });
      }
}