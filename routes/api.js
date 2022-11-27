var express = require('express');

const apiController = require('../controllers/apiController');

var router = express.Router();

router.get('/get-root-categories', apiController.get_root_categories);
//router.get('/search-product', apiController.search_product); //need GET parameter

module.exports = router;