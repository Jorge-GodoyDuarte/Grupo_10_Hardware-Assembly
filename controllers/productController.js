const { name } = require('ejs');
const { search } = require('../routes');

const products = require('../data/db_Module').loadProducts();
const brands = require('../data/db_Module').loadBrands();
const {storeProducts} = require('../data/db_Module')
module.exports = {
    add : (req,res) => {
        return res.render('productAdd',{
            title: 'productadd',
            brands : brands.sort()
        })
        
    },
    store : (req,res) => {
        const {name,marca,modelo,price,discount,} =req.body;
        
        const id = products[products.length - 1].id

        const newProduct = {
            id : id + 1,
            ...req.body,
            name: name.trim(),
            marca: marca.trim(),
            modelo: modelo.trim(),
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

        return res.render('productEdit', {
            brands,
            product,
            title : 'edit'
        })
    },
    update : (req,res) => {
        return res.send(req.body)
        
    },
    detail: (req,res)=>{
        const product = products.find(product => product.id === +req.params.id);
        return res.render('detail',{
            title:'Detalle de producto',
            product
        })
    },
    carrito: (req,res)=>{
        return res.render('shopping-cart',{
            title:'Carrito'
        })
    },

    filter: (req,res) => {
        const productsFilter = products.filter(product => product.section === req.query.section)
    return res.render('products', {
        products : productsFilter,
        title:'products'
    })
    },
    search : (req,res) => {
        const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))
        return res.render('products', {
            products : result,
            keywords : req.query.keywords,
            title:'products'
        })
    }
}