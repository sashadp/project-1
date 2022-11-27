'use strict';

const ProductTileModel = require('../product/productTileModel');

class SearchResultModel {
    constructor(searchResult={}) {
        this.searchQuery = '',
        this.productTileCollection = searchResult && searchResult.hits.map((productTile) => {
            // parsing, validation, etc

            return new ProductTileModel(productTile);
        }) || []
    }
}

module.exports = SearchResultModel;
