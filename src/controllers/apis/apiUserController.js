const db = require("../database/models");
const sequelize = db.sequelize;
const { loadUsers, storeUsers } = require("../data/db_Module");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const authConfig = require("../database/config/auth");
/*     CRUD DATABASE     */

module.exports = {
  
  processLogin: async (req, res) => {
    const errors = validationResult(req);

try {
    const { email, password} = req.body;
    if(!email || !password) {
        throw createError(404, 'Se require email y password');
    }
    let user = await db.User.findOne({
        where : {
            email
        }
    });
    if(!user){
      throw createError(401, 'El usuario no se encuentra registrado');
  }

  if(!compareSync(password, user.password)){
      throw createError(401, 'La contraseña es incorrecta');
  }
    /* if(!user || !compareSync(password, user.password)){
        throw createError(401, 'Credenciales inválidas');
    } */
    const token = jwt.sign(
        {
          id,
          role_id,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expires,
        }
      );
      return res.status(200).json({
        ok: true,
        status: 200,
        data: token,
    });
    
} catch (error) {
       return res.status(error.status || 500).json({
                ok: false,
                errors,
            });
}


  },
  processRegister: async (req, res) => {
    const errors = validationResult(req);
    try {
      const { firstname, lastname, email, city, street, phone, password} = req.body;
      
                // ENCRIPTACIÓN DE CONTRASEÑA

       /* const password = bcryptjs.hashSync((req.body.password,10)) */

       // VALIDACIONES
      if (errors.isEmpty()) {
        // CREACIÓN DEL USUARIO
        const { id, role_id } = await db.User.create({
          firstname: firstname && firstname.trim(),
          lastname: lastname && lastname.trim(),
          email: email && email.trim(),
          password : password.trim(),
          avatar: "default.png",
          role_id: 1,
          payment_id: 3,
          city: city && city.trim(),
          street: street && street.trim(),
          phone: +phone,
        });

            // CREACIÓN DE TOKEN
        const token = jwt.sign(
          {
            id,
            role_id,
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expires,
          }
        );
        return res.status(201).json({
            ok: true,
            status: 201,
            data: token,
        })
      } else{
        let error = new Error;
        error.message = errors.mapped();
        error.status = 404;
        throw error
    }
    } catch (error) {
            return res.status(error.status || 500).json({
            ok: false,
            error,
      }); 
    }
  },

  updateEdit: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { firstName, lastName, email, password } = req.body;
      const users = loadUsers();
      const userModify = users.map((user) => {
        if (users.id === req.session.userLogin.id) {
          if (req.file && req.session.userLogin.avatar) {
            if (
              fs.existsSync(
                path.resolve(
                  __dirname,
                  "..",
                  "public",
                  "images",
                  "users",
                  req.session.userLogin.avatar
                )
              )
            ) {
              console.log(">>>>>>>>>>", req.session.userLogin.avatar);
              fs.unlinkSync(
                path.resolve(
                  __dirname,
                  "..",
                  "public",
                  "images",
                  "users",
                  req.session.userLogin.avatar
                )
              );
            }
          }
          return {
            id: user.id,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: bcryptjs.hashSync(password.trim(), 10),
            rol: "user",
            avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
          };
        }

        return user;
      });
      if (req.file && req.session.userLogin.avatar) {
        if (
          fs.existsSync(
            path.resolve(
              __dirname,
              "..",
              "public",
              "images",
              "users",
              req.session.userLogin.avatar
            )
          )
        ) {
          console.log(">>>>>>>>>>", req.session.userLogin.avatar);
          fs.unlinkSync(
            path.resolve(
              __dirname,
              "..",
              "public",
              "images",
              "users",
              req.session.userLogin.avatar
            )
          );
        }
      }

      storeUsers(userModify);
      return res.redirect("/users/profile");
    } else {
      return res.render("profile", {
        errors: errors.mapped(),
        old: req.body,
        user: loadUsers().find((user) => user.id === req.session.userLogin.id),
      });
    }
  },
};
