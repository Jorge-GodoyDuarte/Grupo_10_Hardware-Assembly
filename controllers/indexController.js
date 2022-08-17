const {loadProducts} = require('../data/productsModule');
module.exports = {
    index: (req, res) => {
      const products=loadProducts();
       return  res.render('index', { 
          title: 'home', 
          products
        });
      }
}