const { name } = require('ejs');
const { search } = require('../routes');

const products = require('../data/db_Module').loadProducts();
const brands = require('../data/db_Module').loadBrands();
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {storeProducts, loadBrands, loadProducts, loadCategory} = require('../data/db_Module');
const { validationResult } = require('express-validator');
module.exports = {
    add : (req,res) => {
        
        const products = loadProducts();
        const category = loadCategory()
        return res.render('productAdd',{
            title: 'productadd',
            brands : brands.sort(),
            products: products.sort(),
            category: category.sort(),
            
        })  
        
    },
    store : (req,res) => {
        const {name,marca,description,price,discount,} =req.body;
        
        const id = products[products.length - 1].id;

        const newProduct = {
            id : id + 1,
            ...req.body,
            name: name,
            marca: marca,
            description: description,
            price: +price,
            discount: +discount,
            image : "intelcorei3-mini.jpg"
        }
        const productsNew = [...products, newProduct] 
        storeProducts(productsNew)
        return res.redirect('/')
    },
    edit : (req,res) => {
        const product = products.find(product => product.id === +req.params.id);
        const category = loadCategory();
        const brands = loadBrands();
        return res.render('productEdit', {
            brands,
            product,
            title : 'edit',
            category
        })
    },
    updateEdit : (req,res) => {
        let errors = validationResult(req); 
        console.log(errors)
        console.log("body", req.body)
        if(errors.isEmpty()) {
            const products = loadProducts();
            const {category,name,brands,description,price,discount} =req.body;
            const productsModify = products.map(product => {
                if (product.id === +req.params.id) {
                    return {
                        ...product,
                        ...req.body,
                        name: name.trim(),
                        brands: brands.trim(),
                        category: category.trim(),
                        price: +price,
                        discount: +discount,
                        image : "intelcorei3-mini.jpg",
                        description: description.trim()
                    }
         }
         return product
        })

        storeProducts(productsModify)
        return res.redirect('/products/detail/' + req.params.id)
        
    } else {
        return res.render('productEdit',{
            category : loadCategory().sort(),
            product : loadProducts().find(product => product.id === +req.params.id),
            brands: loadBrands().sort(),
            errors : errors.mapped(),

        })
    }
  },
  
  detail: (req,res)=>{
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);
        return res.render('detail',{
            title:'Detalle de producto',
            product,
            toThousand
        })
    },
    carrito: (req,res)=>{
        return res.render('shopping-cart',{
            
        })
    },

    filter: (req,res) => {
        const productsFilter = products.filter(product => product.section === req.query.section)
    return res.render('products', {
        products : productsFilter,
        
    })
    },
    search : (req,res) => {
        
        const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()) || product.category.toLowerCase().includes(req.query.keywords.toLowerCase()));

        return res.render('products', {
            products : result,
            keywords : req.query.keywords,
            
        })
    },
    remove : (req,res) => {
        const products = loadProducts();
        const productsModify = products.filter(product => product.id !== +req.params.id);
        
        storeProducts(productsModify)
        return res.redirect('/')
        
    }
}
