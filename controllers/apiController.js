const ocapiSDK = require('../scripts/ocapiSdk');
const productBuilder = require('../scripts/modelsBuilder/productTileBuilder')
const categoryBuilder = require('../scripts/modelsBuilder/categoryTileBuilder')


const get_root_categories = (req, res) => {
    console.log('\n apiController get_root_categories run');

    const levels = 1;

    ocapiSDK.getCategories(levels)
        .then(searchResult => {
            const categoryArr = categoryBuilder.getCategoriesArr(searchResult);

            console.log('categoryArr length = '+categoryArr.length);
            
            res.send(JSON.stringify(categoryArr));
        })
        .catch(function (err) {
            console.log(err);
            res.send('Error');
        });
}

module.exports = {
    get_root_categories
}