const db = require("../database/models");
const sequelize = db.sequelize;
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const jwt = require("jsonwebtoken");

/*     CRUD DATABASE     */
module.exports = {
  login: (req, res) => {
    return res.render("login");
  },

  register: (req, res) => {
    return res.render("register", {
      title: "Register",
    });
  },

  processLogin: async (req, res) => {
    const errors = validationResult(req);

    /*  res.send(errors) */
    if (errors.isEmpty()) {
      let { email } = req.body;

      db.User.findOne({
        where: {
          email,
        },
        include: [
          {
            association: "roles",
          },
        ],
      })
        .then(({ id, firstname, lastname, role_id,email }) => {
          req.session.userLogin = {
            id: +id,
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            role_id: +role_id,
            email
          };
        /* carrito */
        db.Order.findOne({
          where : {
            userId : req.session.userLogin.id,
            statusId : 1
          },
          include : [
            {
              association : 'carts',
              attributes : ['id','quantity'],
              include : [
                {
                  association : 'product',
                  attributes : ['id','name','price','discount'],
                  include : ['images']
                }
              ]
            }
          ]
        }).then(order => {
            if(order) {
        
              req.session.orderCart = {
                id : order.id,
                total : order.total,
                items : order.carts
              }

            }else {

              db.Order.create({
                date : new Date(),
                total : 0,
                userId : req.session.userLogin.id,
                statusId : 1
              }).then(order => {
                
                req.session.orderCart = {
                  id : order.id,
                  total : order.total,
                  items : []
                }
  
              })
            }

            return role_id === 1  ? res.redirect('http://localhost:3001') : res.redirect('/');

        }).catch(error => console.log(error))


      });
    } else {
      return res.render("login", {
        errors: errors.mapped(),
      });
    }
  },
  processRegister: async (req, res) => {
    const errors = validationResult(req);
    const { firstname, lastname, email, city, street, phone, password } =
      req.body;

    // VALIDACIONES
    if (errors.isEmpty()) {
      // CREACIÓN DEL USUARIO
      db.User.create({
        firstname: firstname && firstname.trim(),
        lastname: lastname && lastname.trim(),
        email: email && email.trim(),
        password: bcryptjs.hashSync(password, 10),
        role_id: 1,
        payment_id: 3,
        city: city && city.trim(),
        street: street && street.trim(),
        phone: +phone,
      }).then((user) => {
        return res.redirect("/users/login");
      });
    } else {
      return res.render("register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  logout: (req, res) => {
    delete req.session.userLogin;
    res.cookie("userHassembly", null, {
      maxAge: -1,
    });
    return res.redirect("/");
  },

  profile: (req, res) => {
    
    db.User.findByPk(req.session.userLogin.id, {
      include: ["roles", "metodos"]
    })
      .then((user) => {
        return res.render("profile", {
          user,
        });
      })
      .catch((error) => console.log(error));
  },
  
  updateEdit: async (req, res) => {
        // VALIDACIONES
    const errors = validationResult(req);
        // EDITAR USUARIO
    if (errors.isEmpty()) {
      const { firstName, lastName, email, password } = req.body;
      await db.User.findByPk(req.session.userLogin.id)
      .then(user => {
        db.User.update(
          {
            firstname: firstName.trim(),
            lastname: lastName.trim(),
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
       res.redirect("/") 
      })
      

    } else {
      return res.render("profile", {
        errors: errors.mapped(),
        old: req.body,
        user : await db.User.findByPk(req.session.userLogin.id)
      });
    }
  },
};
