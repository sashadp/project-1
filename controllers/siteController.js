const ocapiSDK = require('../scripts/ocapiSdk');
const productBuilder = require('../scripts/modelsBuilder/productTileBuilder')
const categoryBuilder = require('../scripts/modelsBuilder/categoryTileBuilder')
const SearchResultModel = require('../scripts/models/search/searchResultModel')
const CategoriesModel = require('../scripts/models/category/categoriesModel')

const fetch = require('cross-fetch')

async function getData () {
    const response = await fetch('https://api.publicapis.org/entries', {
        method: 'GET'
    });

    return response.json()
}

const site_index = async (req, res) => {
    console.log('controller run');

    const q = 'dress';
    const levels = 2;


    let resp = await Promise.all([getData(), getData()])

    console.log('\n\n', resp[0].count, '   ', resp[1].count, '\n\n')

    res.render('index', {
        title: 'Express' + ' [q=' + q + ']',
        categoryData: []
    });
/*
    ocapiSDK.getProductSearchResult(q)
        .then(searchResult => {
            const searchResultModel = new SearchResultModel(searchResult);

            console.log('asdasd \n\n', searchResultModel);
            res.render('index', {
                title: 'Express' + ' [' + q + ']',
                data: searchResultModel
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

    // ocapiSDK.getCategories(levels)
    //     .then(searchResult => {
    //         const categoryArr = categoryBuilder.getCategoriesArr(searchResult);

    //         console.log('categoryArr length = '+categoryArr.length);

    //         res.render('index', {
    //             title: 'Express' + ' [q=' + q + ']',
    //             categoryData: categoryArr
    //         });
    //     })
    //     .catch(function (err) {
    //         console.log(err);

    //         res.render('index', {
    //             title: 'Express' + ' [q=' + q + ']',
    //             categoryData: categoryArr
    //         });
    //     });

}

module.exports = {
    site_index
}
