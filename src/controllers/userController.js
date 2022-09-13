const {loadUsers, storeUsers} = require ('../data/db_Module')
const {validationResult}=require('express-validator')
const bcryptjs =require('bcryptjs')
const fs = require('fs');
const path = require('path');
module.exports = {
    register : (req, res) => {
        
        return res.render('register',{
            title: 'Register',
            
                
        })
    },
    processRegister:(req,res)=>{
        const errors = validationResult(req)
       
    
        if(errors.isEmpty()){

        const {firstName, lastName, email, password }= req.body

        const users = loadUsers()
        
        const newUser={
            id: users[users.length-1] ? users[users.length-1].id+1:1,
            firstName : firstName.trim(),
            lastName : lastName.trim(),
            email : email.trim(),
            password:bcryptjs.hashSync(password.trim(),10),
            password2:null,
            rol:'user',
            avatar: req.file ? req.file.filename : null,
            gender:null,
            hobbies :[],
            address:null,
            cities : require('../data/cities'),
            provinces:require('../data/provinces'),
            about:null
            
        }
        const usersModify = [...users, newUser]

        storeUsers(usersModify)
        return res.redirect('/users/login')

    }else{
        return res.render('register',{
            errors: errors.mapped(),
            old: req.body
        })
    }
    
       

    },
    login : (req, res) => {
        return res.render('login',{
            title :'Login'
        })
    },
    processLogin:(req,res)=>{
        let errors = validationResult(req)
       
        if(errors.isEmpty()){
            
        let {id, firstName,rol, avatar}= loadUsers().find(user=>user.email=== req.body.email);

        req.session.userLogin = {
            id,
            firstName,
            rol,
            avatar
        }

        return res.redirect('/users/profile')

    }else{
        return res.render('login',{
            errors: errors.mapped(),
            old: req.body
        })
    }

    },
    logout:(req,res)=>{
        req.session.destroy()
        return res.redirect('/')
    },
   
    profile: (req,res) =>     {
        let user = loadUsers().find(user = user.id === req.session.userLogin.id);
        return res.render('profile', {
            user,
            cities: require('../data/provinces'),
            provinces : require('../data/provinces')
        })  
    },
    update:(req,res)=>{

        const {firstName, lastName, birthday, address, city, province, about} = req.body;

        let usersModify = loadUsers().map(user => {
            if(user.id === +req.params.id){
                return {
                    ...user,
                    ...req.body,
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
        return res.redirect('/users/login')
    }
}