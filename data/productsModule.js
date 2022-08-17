const fs = require('fs');
const path = require('path')

const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'))    
}




module.exports = {
    loadProducts
}