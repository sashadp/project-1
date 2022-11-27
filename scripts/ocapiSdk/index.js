'use strict';

const fetch = require('cross-fetch');

const {
    getProductSearchUrl,
    getCategoriesUrl
} = require('./urlBuilder');

/*
Example above.
There are 100 products on site as per user query. You want to display only 25 products per page.
If user wants to display next 25, user must click on the "go next" page button.
In this case, for the second page "start" param of "getProductSearchResult" function would be 25). For the third page 50 etc.
*/

module.exports = {
    getProductSearchResult: function (q='', startIndex = 0) {
        const productSearchUrl = getProductSearchUrl({
            q: q,
            count: 25, // by default 25 products per search result
            refine_2: 'orderable_only', // return only orderable products
            expand: 'availability,prices,images', // expand params. if defined mentioned data will be returned
            start: startIndex // check example above
        });

        return fetch(productSearchUrl, {
                method: 'GET'
            })
            .then(function (res) {
                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return res.json();
            });
    },
    getCategories: function (levels=1) {
        const categoriesUrl = getCategoriesUrl({
            levels: levels,
        });

        return fetch(categoriesUrl, {
                method: 'GET'
            })
            .then(function (res) {
                if (res.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return res.json();
            });
    }
};