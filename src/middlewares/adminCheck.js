module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.rolId == 2){
        next()
    } else {
        res.redirect('/')
    }
}