'use strict';

const CategoryTileModel = require('./categoryTileModel');

class CategoriesModel {
    constructor(categorySearchResult={}) {
        this.categories = [];

        if (categorySearchResult && categorySearchResult.data) {
            categorySearchResult.data.forEach((rootCategory) => {
                rootCategory.categories.forEach((firstLevelCategory) => {
                    if ('categories' in firstLevelCategory) {
                        firstLevelCategory.categories.forEach((secondLevelCategory) => {
                            if ('categories' in secondLevelCategory) {
                                secondLevelCategory.categories.forEach((thirdLevelCategory) => {
                                    new CategoryTileModel(categoryTile);
                                })
                            } else {
                                // ????
                            }
                        })
                    } else {
                        // ????
                    }
                })
            });
        }
    }
}

module.exports = CategoriesModel;
