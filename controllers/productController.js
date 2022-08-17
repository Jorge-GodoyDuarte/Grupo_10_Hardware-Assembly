const { search } = require('../routes');

const products = require('../data/productsModule').loadProducts();


module.exports = {
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