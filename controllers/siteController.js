const ocapiSDK = require('../scripts/ocapiSdk');
const productBuilder = require('../scripts/modelsBuilder/productTileBuilder')

const site_index = (req, res) => {
    console.log('controller run');

    const q = 'dress';

    ocapiSDK.getProductSearchResult(q)
        .then(searchResult => {
            const productArr = productBuilder.getProductsArr(searchResult);

            //console.log(productArr);
            res.render('index', {
                title: 'Express' + ' [' + q + ']',
                data: productArr
            });
        })
        .catch(function (err) {
            console.log(err)

            res.render('index', {
                title: 'Express' + ' [' + q + ']',
                data: productArr
            });
        })
}

module.exports = {
    site_index
}