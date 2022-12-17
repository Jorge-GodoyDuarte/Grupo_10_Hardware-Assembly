const db = require("../../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const jwt = require("jsonwebtoken");


module.exports = {
  getAll : async (req,res) => {
    try {

        let {count, rows : users} = await db.User.findAndCountAll({
            attributes : ['id','firstname','lastname','email']
        })

        return res.status(200).json({
            ok : true,
            total : count,
            users
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || '¡Ha ocurrido un error! Comunicate con el admnistrador'
        })
    }
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
/*     const token = jwt.sign(
        {
          id,
          role_id,
        },
        authConfig.secret,
        {
          expiresIn: authConfig.expires,
        }
      ); */
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
      
       // VALIDACIONES
      if (errors.isEmpty()) {
        // CREACIÓN DEL USUARIO
        const { id, role_id } = await db.User.create({
          firstname: firstname && firstname.trim(),
          lastname: lastname && lastname.trim(),
          email: email && email.trim(),
          password : bcryptjs.hashSync((password,10)),
          avatar: "default.png",
          role_id: 1,
          payment_id: 3,
          city: city && city.trim(),
          street: street && street.trim(),
          phone: +phone,
        });

/*             // CREACIÓN DE TOKEN
        const token = jwt.sign(
          {
            id,
            role_id,
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expires,
          }
        ); */
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
  verifyEmail : async (req,res) => {

    try {
        const {email} = req.body;
        let user = await db.User.findOne({
            where : {
                email
            }
        })

        return res.status(200).json({
            ok : true,
            verified : user ? true : false
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            error : error.message
        })
    }
}
};
