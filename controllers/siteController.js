const ocapiSDK = require('../scripts/ocapiSdk');
const productBuilder = require('../scripts/modelsBuilder/productTileBuilder');
const categoryBuilder = require('../scripts/modelsBuilder/categoryTileBuilder');
const SearchResultModel = require('../scripts/models/search/searchResultModel');
const CategoriesModel = require('../scripts/models/category/categoriesModel');

const fetch = require('cross-fetch');
const fs = require("fs");

async function getData () {
    const response = await fetch('https://api.publicapis.org/entries', {
        method: 'GET'
    });
    return response.json();
}

async function getCatalogMenu() {
    const levels = 3;
    const now = new Date();

    let fileContent = fs.readFileSync("views/partials/productCatalogMenu.json", "utf8");
    //console.log('file content:\n'+fileContent+'\n\n');
    console.log('readFileSync views/partials/productCatalogMenu.json');
    
    let catalogMenuObj = JSON.parse(fileContent);
    let catalogMenuDate = new Date(catalogMenuObj.last_update);

    if ((now.getTime() - catalogMenuDate.getTime()) < 1*60*1000 ) {// one minute
        console.log('getting categoryArr from json');
        return catalogMenuObj.catalogMenu;
    }

    return ocapiSDK.getCategories(levels)
        .then(searchResult => {
            const categoryArr = categoryBuilder.getCategoriesArr(searchResult);
            console.log('sending request getCategories -> response = categoryArr length = '+categoryArr.length);
            catalogMenuObj.last_update = now;
            catalogMenuObj.catalogMenu = categoryArr;
            fs.writeFileSync("views/partials/productCatalogMenu.json", JSON.stringify(catalogMenuObj));
            console.log('writeFileSync views/partials/productCatalogMenu.json');
            return categoryArr;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
}

async function getProducts(q) {
    return ocapiSDK.getProductSearchResult(q)
        .then(searchResult => {
            const searchResultModel = new SearchResultModel(searchResult);
            //console.log('asdasd \n\n', searchResultModel.productTileCollection);
            console.log('sending request getProductSearchResult -> response = productArr length = '+searchResultModel.productTileCollection.length);
            return searchResultModel.productTileCollection;
        })
        .catch(function (err) {
            console.log(err);
            return err;
        });
}

const site_index = async (req, res) => {
    console.log('\n\ncontroller site_index run');
    const q = 'dress';

    let resp = await Promise.all([getCatalogMenu(), getProducts(q)]);
    //console.log('\n\n', resp[0].count, '   ', resp[1].count, '\n\n');

    res.render('index', {
        title: 'Express' + ' [q=' + q + ']',
        categoryData: resp[0],
        testData: resp[1].count,
        productData: resp[1],
    });

}

module.exports = {
    site_index
}
