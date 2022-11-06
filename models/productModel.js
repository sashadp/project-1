const config = require('../config');

const https = require('https');

// serch product function: q = search query
function productSearch(q,count,orderable_only=true) {
    return new Promise((resolve, reject) => {
        https.get('https://'+config.HOST+'/s/Sites-'+config.SITE+'-Site/dw/shop/'+config.OCAPI_VERSION+'/product_search?q='+q+'&count='+count+'&client_id='+config.CLIENT_ID+'&refine_2=orderable_only='+orderable_only+'&expand=availability,prices,images', (res) => {
            let data = [];
            res.on('data', function (chunk) {
                data.push(chunk);
            });
            res.on('end', function () {
                const data_obj = JSON.parse(data);
                console.log('search result count = '+data_obj.hits.length);
                resolve(data_obj.hits);
            });
        }).on('error', (e) => {
            console.error(e);
        });
    });
}

module.exports = {
    productSearch
};