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

		let newest = db.Product.findAll({
			limit: 4,
			include: ['images', 'category']
		})
   let category = db.Category.findAll()
    
    Promise.all([product, newest, category])
    .then(([product, newest, category]) => {
      
      return res.render('index', {
        product,
        newest,
        category,
        toThousand
      })
    })
    .catch(error => console.log(error))
  },
  Terms: (req, res) => {
    res.render("terms.ejs");
  },
};
