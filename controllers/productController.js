module.exports = {
    detail: (req,res)=>{
        return res.render('detail',{
            title:'Detalle de producto'
        })
    },
    carrito: (req,res)=>{
        return res.render('shopping-cart',{
            title:'Carrito'
        })
    }
}