var express = require('express');

const siteController = require('../controllers/siteController');

var router = express.Router();


/* GET home page. */
router.get('/', siteController.site_index);


module.exports = router;
