const db = require('../database/models');
const { Op } = require('sequelize')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
  home: (req, res) => {
    const images = '/images/product-images'
    let product = db.Product.findAll({
      limit: 10,
			where: {
				discount: {
					[Op.gt]: 10
				}
			},
			include: ['images', 'category','brand']
		});


   let category = db.Category.findAll()
   let newProduct = db.Product.findAll({
    limit: 5,
    order : [['id','DESC']],
    include: ['images', 'category','brand']
  });
    Promise.all([product,category, newProduct])
    .then(([product,category, newProduct]) => {
      
      return res.render('index', {
        product,
        category,
        newProduct,
        toThousand
      })
    })
    .catch(error => console.log(error))
  },
  Terms: (req, res) => {
    res.render("terms.ejs");
  },
};
