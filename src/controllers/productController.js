const db = require("../database/models");
const sequelize = db.sequelize;
const {Op} = require('sequelize')
const { name } = require("ejs");
const { search } = require("../routes");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");
const { Association } = require("sequelize");

module.exports = {
  create: (req, res) => {
    // Do the magic
    let categories = db.Category.findAll({
      order: ["name"],
    });
    let brands = db.Brand.findAll({
      order: ["name"],
    });
    Promise.all([categories, brands])
      .then(([categories, brands]) => {
        return res.render("productAdd", {
          categories,
          brands,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    // Do the magic
    db.Product.findByPk(req.params.id, {
        include : ['brand','images']
    })
      .then((product) => {
       /*  return res.send(product) */
        return res.render("detail", {
          product,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
  store: (req, res) => {
    const { name, price, discount, description, brand_id, categories_id } =
      req.body;
    db.Product.create({
      name : name.trim(),
      price: +price,
      discount: +discount,
      description : description.trim(),
      brand_id: +brand_id,
      categories_id: +categories_id,
    })
      .then((product) => {
        return res.redirect("/products/detail/" + product.id);
      })
      .catch((error) => console.log(error));
  },

  editProduct: (req, res) => {
    /*   const product = products.find(product => product.id === +req.params.id); */
    let products = db.Product.findByPk(req.params.id, {
      include: ["images"],
    });
    let categories = db.Category.findAll();
    let brands = db.Brand.findAll();
    Promise.all([products, categories, brands])
      .then(([products, categories, brands]) => {
        res.render("productEdit", {
          products,
          categories,
          brands,
        });
      })
      .catch((error) => console.log(error));
  },
  updateEdit: (req, res) => {
    const { name, price, discount, description, brands, category } = req.body;

    db.Product.update(
      {
        name: name.trim(),
        price: +price,
        discount: +discount,
        description: description.trim(),
        brand_id: +brands,
        categories_id: +category,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((product) => {
        return res.redirect("/products/detail/" + req.params.id);
      })
      .catch((error) => console.log(error));
  },
  
   remove : (req, res) => {
		db.Product.destroy({
			where : {
				id : req.params.id
			}
		})
			.then(() => {
				return res.redirect('/');
			})
			.catch(error => console.log(error))
    
} ,
 	search: (req, res) => {
		// Do the magic
		let { keywords } = req.query;
    
		db.Product.findAll({
      include : ['brand','category','images'],
			where: {
				[Op.or]: [
					{
						name: {
							[Op.substring]: keywords,
						},
					},
					{
						description: {
							[Op.substring]: keywords,
						},
					},
				],
			},
		})
			.then((result) => {
return res.render("search", {
					result,
					toThousand,
					keywords
				});  
			})
			.catch((error) => console.log(error));
	},
  filter: (req,res) => {
    let products = db.Product.findAll({
      limit: 10,
      include: ['category','images','brand'],
      where : {
       categories_id : req.params.id
      }
    })
    let category = db.Category.findAll()
    Promise.all([products])
    .then((products,categoria) => {{
      return res.send(products)
      return res.render('products', {
       products,
       toThousand
        
    })
    }})
    
},
carrito: (req,res)=>{
  return res.render('cart')
}
}
   