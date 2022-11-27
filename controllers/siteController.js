const ocapiSDK = require('../scripts/ocapiSdk');
const productBuilder = require('../scripts/modelsBuilder/productTileBuilder')
const categoryBuilder = require('../scripts/modelsBuilder/categoryTileBuilder')


const site_index = (req, res) => {
    console.log('controller run');

    const q = 'dress';
    const levels = 2;
/*
    ocapiSDK.getProductSearchResult(q)
        .then(searchResult => {
            const productArr = productBuilder.getProductsArr(searchResult);

            console.log('productArr length = '+productArr.length);
            res.render('index', {
                title: 'Express' + ' [' + q + ']',
                productData: productArr
            });
        })
        .catch(function (err) {
            console.log(err);

            res.render('index', {
                title: 'Express' + ' [' + q + ']',
                productData: productArr
            });
        });
        */

    ocapiSDK.getCategories(levels)
        .then(searchResult => {
            const categoryArr = categoryBuilder.getCategoriesArr(searchResult);

            console.log('categoryArr length = '+categoryArr.length);
            
            res.render('index', {
                title: 'Express' + ' [q=' + q + ']',
                categoryData: categoryArr
            });
        })
        .catch(function (err) {
            console.log(err);

            res.render('index', {
                title: 'Express' + ' [q=' + q + ']',
                categoryData: categoryArr
            });
        });

}

module.exports = {
    site_index
}