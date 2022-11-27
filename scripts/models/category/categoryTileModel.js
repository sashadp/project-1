'use strict';

class CategoryTile {
    constructor(categoryTile={}) {
        const {id, image, name, parent_category_id} = categoryTile;

        this.id = id;
        this.image = image;
        this.name = name;
        this.parent_category_id = parent_category_id;
    }
}

module.exports = CategoryTile;