const db = require('../database/models');
const sequelize = db.sequelize;

const {loadUsers, storeUsers} = require ('../data/db_Module')
const {validationResult}=require('express-validator')
const bcryptjs =require('bcryptjs')
const fs = require('fs');
const path = require('path');
const session = require('express-session');

/*     CRUD DATABASE     */

const userController = {
    'profile': (req,res)  =>  {
        db.User.findByPk( req.params.id)
        .then(user  =>  {
            res.send('profile.ejs', {user})
        })
    },

    'register' : (req, res) => {
            res.send('register.ejs')
                
        },
    
    'processRegister' : (req,res) => {
        
    }
}









module.exports = {
    login: (req, res) => {
        return res.render("login");
      },
    register : (req, res) => {
        
        return res.render('register',{
            title: 'Register',
            
                
        })
    }, processLogin:(req,res)=>{
        let errors = validationResult(req)
       
        if(errors.isEmpty()){
            
        let {id, firstName,rol, avatar}= loadUsers().find(user=>user.email=== req.body.email);

        req.session.userLogin = {
            id,
            firstName,
            rol,
            avatar
        }
        if(req.body.remember){
            res.cookie('userHassembly',req.session.userLogin,{
                maxAge : 1000 * 60
            })
        }

        return res.redirect('/' )

    }else{
        return res.render('login',{
            errors: errors.mapped(),
            old: req.body
        })
    }

    },
    processRegister:(req,res)=>{
        const errors = validationResult(req)
        /* res.send(req.body) */
    
        if(errors.isEmpty()){ 

        const {firstname, lastname, email, password, city, street, phone }= req.body
       

      db.User.create({
            firstname : firstname,
            lastname : lastname,
            email : email,
            password: bcryptjs.hashSync(password,10),
            password2:null,
            avatar: 'default.png',
            role_id : 1,
            payment_id: 3,
            city : city,
            street : street,
            phone : +phone
        }
        )
        .then( () => {
            return res.redirect('/users/login')  

        }).catch(error => console.log(error));

    }else{
        return res.render('register',{
            errors: errors.mapped(),
            old: req.body
        })
    }
       

    },
    logout:(req,res)=>{
        delete req.session.userLogin
            res.cookie('userHassembly',null,{
                maxAge : -1
            })
        return res.redirect('/')
    },
   
    profile: (req,res) =>     {
        let user = loadUsers().find( user => user.id === req.session.userLogin.id);
        return res.render('profile', {
            user
        })
    },
    update:(req,res)=>{

        const {firstName, lastName, birthday, address, city, province, about} = req.body;
        let user = loadUsers().find(user => user.id == req.session.userLogin.id)
        let usersModify = loadUsers().map(user => {
            if(user.id === +req.params.id){
                return {
                    ...user,
                    ...req.body,
                    password : req.body.password ? bcryptjs.hashSync(req.body.password, 10) : user.password,
                    avatar : req.file ? req.file.filename : req.session.userLogin.avatar
                }
            }
            return user
        });
        if(req.file && req.session.userLogin.avatar){
            if(fs.existsSync(path.resolve(__dirname,'..','public','images','users',req.session.userLogin.avatar))){
                console.log('>>>>>>>>>>',req.session.userLogin.avatar);
                fs.unlinkSync(path.resolve(__dirname,'..','public','images','users',req.session.userLogin.avatar))
            }
        }
    
        req.session.userLogin = {
            ...req.session.userLogin,
            firstName,
            avatar : req.file ? req.file.filename : req.session.userLogin.avatar
        }

        storeUsers(usersModify);
        return res.redirect('/')
    },
    updateEdit : (req,res) => {
        const errors = validationResult(req)
        if(errors.isEmpty()) {
            const {firstName,lastName,email,password} = req.body;
            const users = loadUsers()
            const userModify = users.map( user => {
                if( users.id === req.session.userLogin.id) {
                    if(req.file && req.session.userLogin.avatar){
                        if(fs.existsSync(path.resolve(__dirname,'..','public','images','users',req.session.userLogin.avatar))){
                            console.log('>>>>>>>>>>',req.session.userLogin.avatar);
                            fs.unlinkSync(path.resolve(__dirname,'..','public','images','users',req.session.userLogin.avatar))
                        }
                    }
                    return {
                        id: user.id,
                        firstName : firstName.trim(),
                        lastName : lastName.trim(),
                        email : email.trim(),
                        password : bcryptjs.hashSync(password.trim(),10),
                        rol: 'user',
                        avatar : req.file ? req.file.filename : req.session.userLogin.avatar,
                    }
                    
                }

                return user
            })
            if(req.file && req.session.userLogin.avatar){
                if(fs.existsSync(path.resolve(__dirname,'..','public','images','users',req.session.userLogin.avatar))){
                    console.log('>>>>>>>>>>',req.session.userLogin.avatar);
                    fs.unlinkSync(path.resolve(__dirname,'..','public','images','users',req.session.userLogin.avatar))
                }
            }
            
            storeUsers(userModify);
            return res.redirect('/users/profile')
        } else {
            return res.render('profile',{
            errors: errors.mapped(),
            old: req.body,
            user : loadUsers().find( user => user.id === req.session.userLogin.id),
            })
     }
    } 
}
