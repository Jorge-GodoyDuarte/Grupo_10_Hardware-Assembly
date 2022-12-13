const db = require("../database/models");
module.exports = {
  home: (req, res) => {
    let products = db.Product.findAll({
      include: ["marcas", "categorias"],
      limit: 10,
      include: ["images","brand"],
    })
    let categories = db.Category.findAll()
    Promise.all(([products,categories]))
      .then(([products,categories]) => {
        //return res.send(categories)
        return res.render("index.ejs", {
          products,
          categories
        });
      })

      .catch((error) => console.log(error));
  },
  Terms: (req, res) => {
    res.render("terms.ejs");
  },
};
