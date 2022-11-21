'use strict';

const ProductTileModel = require('../models/product/productTileModel');

module.exports = {
    getProductsArr: function (productSearchResult) {
        let productSearchResultArr = [];

        productSearchResultArr = productSearchResult && productSearchResult.hits.map((productTile) => {
            // parsing, validation, etc

            return new ProductTileModel(productTile);
        }) || [];

        return productSearchResultArr;
    }
};