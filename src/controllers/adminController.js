const db = require("../database/models");
const sequelize = db.sequelize;
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
module.exports ={
    ProductList : (req,res) => {
      return res.render('panelProducts')
    },
    Panel : (req,res) => { 
        db.User.findByPk(req.session.userLogin.id, {
            where : {
                role_id : 2
            },
      include: ["roles", "metodos"]
    })
      .then((user) => {
        return res.render("admin", {
          user,
        });
      })
      .catch((error) => console.log(error));
  },
  editAdmin: async (req, res) => {
    // VALIDATIONS
const errors = validationResult(req);
    // EDIT ADMIN
if (errors.isEmpty()) {
  const { firstname, lastname, email, password } = req.body;
  await db.User.findByPk(req.session.userLogin.id)
  .then( user => {
    
    db.User.update(
      {
        ...user,
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password : password ? bcryptjs.hashSync(password, 10) : user.password,
       
      },
      {
        where : {
          id : req.session.userLogin.id
        }
        
      }
    )
  }).then( () => {
   res.redirect("/users/panel") 
  })
  

} else {
  return res.redirect("/", {
    errors: errors.mapped(),
    old: req.body,
    user : await db.User.findByPk(req.session.userLogin.id)
  });
}
}
    }
