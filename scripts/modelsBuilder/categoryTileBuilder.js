'use strict';

const CategoryTileModel = require('../models/category/categoryTileModel');

module.exports = {
    getCategoriesArr: function (categoryResult) {
        let categoryResultArr = [];

        /*categoryResultArr = categoryResult && categoryResult.categories.map((categoryTile) => {
            // parsing, validation, etc

            return new CategoryTileModel(categoryTile);
        }) || [];*/

        categoryResultArr = categoryResult.categories;

        return categoryResultArr;
    }
};