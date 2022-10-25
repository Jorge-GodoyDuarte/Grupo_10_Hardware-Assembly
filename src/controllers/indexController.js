const {loadProducts,loadCategory} = require('../data/db_Module');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
module.exports = {
  home: (req,res) => {
    let products = db.Product.findAll({
     /*  attributes : [
        'id','name','brand','price','discount','description'
      ], */
    /*     include : [{
            association: 'category'},
        {
            association: 'brand'
        },
        {
            association: 'price'
        },
        {
            association: 'discount'
        },
        {
            association: 'image'
        },
    ] */
    } )
    Promise.all([products])
    .then(([products]) => {
       /*  res.render('index.ejs', {
            products
        }) */ res.send(products)
    })
    .catch(error => console.log(error))
/*     db.Product.findAll()
    .then(products => {
      return res.send(products)
    })
    .catch(error => console.log(error)) */
      }
}
