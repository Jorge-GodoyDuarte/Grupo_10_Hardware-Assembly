const db = require('../database/models');
module.exports = {
  home: (req,res) => {
    let products = db.Product.findAll({
      include :  ['marcas','categorias']  
  }); 
  let images = db.Image.findAll();
    Promise.all([products,images])
    .then(([products,images]) => {res.render('index.ejs', {
            products,
            images
        })   
          
    })
    
    .catch(error => console.log(error))
      },
      terms : (req,res) => {
        res.render('terms.ejs')
      }

}


