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

const userController = {
  profile: (req, res) => {
    db.User.findByPk(req.params.id).then((user) => {
      res.send("profile.ejs", { user });
    });
  },

  register: (req, res) => {
    res.send("register.ejs");
  },

  processRegister: (req, res) => {},
};

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




    /*  res.send(errors) */
    /* if(errors.isEmpty()){ */

    let { email } = req.body;

    db.User.findOne({
      where: {
        email: email,
      },
      include: [
        {
          association: "roles",
          attributes: ["name"],
        },
      ],
    })
      .then((user) => {
        return res.redirect("/", {
          user,
        });
      })
      .catch((error) => console.log(error));

    /* 
    } */
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
        return res.render('register',{
            errors: errors.mapped(),
            old: req.body
        })
    }
    } catch (error) {
            return res.status(error.status || 500).json({
            ok: false,
            error,
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
    let user = loadUsers().find((user) => user.id === req.session.userLogin.id);
    return res.render("profile", {
      user,
    });
  },
  update: (req, res) => {
    const { firstName, lastName, birthday, address, city, province, about } =
      req.body;
    let user = loadUsers().find((user) => user.id == req.session.userLogin.id);
    let usersModify = loadUsers().map((user) => {
      if (user.id === +req.params.id) {
        return {
          ...user,
          ...req.body,
          password: req.body.password
            ? bcryptjs.hashSync(req.body.password, 10)
            : user.password,
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

    req.session.userLogin = {
      ...req.session.userLogin,
      firstName,
      avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
    };

    storeUsers(usersModify);
    return res.redirect("/");
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
