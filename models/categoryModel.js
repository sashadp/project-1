const config = require('../config');

const https = require('https');

// serch category function: categoryId, level
function categorySearch(categoryId,level) {
    return new Promise((resolve, reject) => {
        https.get('https://'+config.HOST+'/s/Sites-'+config.SITE+'-Site/dw/shop/'+config.OCAPI_VERSION+'/categories/'+categoryId+'?level='+level+'&client_id='+config.CLIENT_ID, (res) => {
            let data = [];
            res.on('data', function (chunk) {
                data.push(chunk);
            });
            res.on('end', function () {
                const data_obj = JSON.parse(data);
                console.log('search result count = '+data_obj.categories.length);
                resolve(data_obj.categories);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    });
}

module.exports = {
    categorySearch
};