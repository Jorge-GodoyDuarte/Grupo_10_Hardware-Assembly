const multer = require('multer');
const path = require('path');
const mime = require('mime');

const storageImgProduct = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/product-images')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        ext = ext.length > 1 ? ext : '.' + mime.extension(file.mimetype);
        const fileName = Date.now() + '_imgpoduct' + ext;
        console.log('filename: ', fileName); // <= vemos el resultado
        cb(null, fileName);
    }
});


const storageImgUser = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/users')
    },
    filename : function (req,file,callback){
        callback(null, `${Date.now()}_users_${path.extname(file.originalname)}`)
    }
})

const uploadImgProduct = multer({
    storage : storageImgProduct
})

const uploadImgUser = multer({
    storage : storageImgUser
})

module.exports = {
    uploadImgProduct,
    uploadImgUser
}
