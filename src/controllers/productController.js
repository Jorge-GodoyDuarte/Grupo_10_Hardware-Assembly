const db = require("../database/models");
const sequelize = db.sequelize;
const {Op} = require('sequelize')
const { name } = require("ejs");
const { search } = require("../routes");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");
const { Association } = require("sequelize");

module.exports = {
  list: async (req, res) => {

      try {
          let {limit = 4, page = 1, order = 'ASC', sortBy = 'id', search = "", sale = 0} = req.query;
          
      
        /* paginación */
        limit = limit > 16 ? 16 : +limit;
        page = +page;
        let offset = +limit * (+page - 1);
  
        /* ordenamiento */
        order = ['ASC','DESC'].includes(order.toUpperCase()) ? order : 'ASC';
        sortBy =  ['id','name', 'price', 'discount', 'categories_id', 'brand_id', 'description'].includes(sortBy.toLowerCase()) ? sortBy : 'id';
  
        let orderQuery = sortBy === "categories_id" ? ['categories_id','name',order] : sortBy === "brand_id" ? ['createdAt', 'DESC'] : [sortBy, order]
  
        let options = {
          /* subQuery:false, */
          limit,
                  distinct: true,
          offset,
          order : [orderQuery],
          include : [
            {
              association : 'images'
            },
            {
              association : 'category',
              attributes : ['name','id'],
              
            },
                      {
              association : 'brand',
              attributes : ['name','id'],
              
            }
          ],
          attributes : {
            exclude : ['updatedAt','deletedAt'],
            include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/',Product.id)`),'url']]
          },
          where : {
            [Op.or] : [
              {
                name : {
                  [Op.substring] : search
                }
              },
              {
                description : {
                  [Op.substring] : search
                }
              },
            /* 	{
                "$category.name$" : {
                  [Op.substring] : search
                }
              } */
            ],
            [Op.and] : [
              {
                discount : {
                  [Op.gte] : sale
                }
              }
            ]
          }
          
        
        }
  
        const {count, rows : products} = await db.Product.findAndCountAll(options);
  
  
        const queryKeys = {
          limit,
          order,
          sortBy,
          search,
          sale
        }
  
        let queryUrl = "";
  
        for (const key in queryKeys) {
  
          queryUrl += `&${key}=${queryKeys[key]}`
        
        }
  
  
        const existPrev = page > 1;
        const existNext = offset + limit < count;
  
        const prev =  existPrev ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}${queryUrl}` : null;
        const next = existNext ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}${queryUrl}` : null;
  
        return res.status(200).json({
          ok : true,
          meta : {
            total : count,
            quantity : products.length,
            page,
            prev, 
            next
          },
          data : products
        })
  
  
      } catch (error) {
        let errors = sendSequelizeError(error);
  
              return res.status(error.status || 500).json({
                  ok: false,
                  errors,
              });
      }
  },
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
    db.Product.findAll({
      include: ['category'],
      where : {
        id : req.params.id
      }
    })
    .then((category) => {{
      return category
      return res.render('products', {
       category
        
    })
    }})
    
})
},
carrito: (req,res)=>{
  return res.render('cart')
},

}
   