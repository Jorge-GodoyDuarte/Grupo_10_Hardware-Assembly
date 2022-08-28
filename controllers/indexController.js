const {loadProducts} = require('../data/db_Module');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
    index: (req, res) => {
      const products=loadProducts();
       return  res.render('index', { 
          title: 'home', 
          products,
          toThousand
        });
      }
}