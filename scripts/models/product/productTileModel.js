'use strict';

class ProductTile {
    constructor(productTile={}) {
        const {product_id, product_name, price, image, link} = productTile;

        this.product_id = product_id;
        this.product_name = product_name;
        this.price = price;
        this.image = image;
        this.link = link;
    }
}

module.exports = ProductTile;