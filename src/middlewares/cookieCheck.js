module.exports = (req,res,next) => {
    if(req.cookies.userHassembly){
        req.session.userLogin = req.cookies.userHassembly
    }
    next()
};