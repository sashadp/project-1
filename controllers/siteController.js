const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const site_index = (req, res) => {
  console.log('controller run');

  let q = 'dress';
  let count = 5;

  Product.productSearch(q,count)
    .then(result => {
      console.log(result);
      res.render('index', { 
        title: 'Express'+' ['+q+']',
        data: result
      });
    })
    .catch(err => {
      console.log(err);
    });
    
}

module.exports = {
    site_index
}