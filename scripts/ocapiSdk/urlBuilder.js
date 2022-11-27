'use strict';

const {
    HOST,
    SITE,
    OCAPI_VERSION,
    CLIENT_ID
} = require('../../config');

function getShopApiBase() {
    return `https://${HOST}/s/Sites-${SITE}-Site/dw/shop/${OCAPI_VERSION}`;
}

function addQueryParamToUrl(url, extraParams) {
    const [pathname, search] = url.split('?')
    const params = new URLSearchParams(search)

    // Apply any extra params.
    Object.keys(extraParams).forEach((key) => {
        const value = extraParams[key]

        // 0 is a valid value as for a param
        if (!value && value !== 0) {
            params.delete(key)
        } else {
            params.set(key, value)
        }
    })

    // Clean up any trailing `=` for params without values.
    const paramStr = params
        .toString()
        .replace(/=&/g, '&')
        .replace(/=$/, '')

    // Generate the newly updated url.
    return `${pathname}${Array.from(paramStr).length > 0 ? `?${paramStr}` : ''}`
}

module.exports = {
    getProductSearchUrl: function (queryParam = {}) {
        const shopApiBase = getShopApiBase();
        const baseProductSearchUrl = `${shopApiBase}/product_search`;
        const requestQueryParam = {
            ...queryParam,
            client_id: CLIENT_ID
        };

        return addQueryParamToUrl(baseProductSearchUrl, requestQueryParam);
    },
    getCategoriesUrl: function (queryParam = {}) {
        const shopApiBase = getShopApiBase();
        const baseProductSearchUrl = `${shopApiBase}/categories/root`;
        const requestQueryParam = {
            ...queryParam,
            client_id: CLIENT_ID
        };

        return addQueryParamToUrl(baseProductSearchUrl, requestQueryParam);
    }
};