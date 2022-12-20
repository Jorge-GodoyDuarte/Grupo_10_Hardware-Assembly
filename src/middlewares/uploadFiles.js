const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,file, callback)=>{
        callback(null, './public/images/product-images')
    },
    filename :(req,file,callback)=>{
        callback(null, `img-${Date.now()}_product${path.extname(file.originalname)}`)
    }
    
});
const upload = multer({
    storage    
})
module.exports = upload;
