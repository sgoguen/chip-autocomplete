import { getProductExample } from './product-example';
import { ItemResponse, ProductSkuResponse } from './source-model';

export class ProductDescriptionModel {

    public currentSKUNo: string;
    private source: ItemResponse;

    get currentSKU() {
        const found = this.source.skuList.filter(s => s.itemNumber === this.currentSKUNo);
        if (found) {
            return found[0];
        } else {
            return null;
        }
    }

    get model() {
        const source = this.source;
        const { product, currentSKU, specification } = source;
        const name = product.productName;
        const brand = product.brand;
        const itemNumber = product.itemNumber;
        const currentSKUNo = currentSKU.itemNumber;
        const SKUs = source.skuList
            .map(s => ({
                itemNumber: s.itemNumber,
                skuShortDesc: s.skuShortDesc,
                currentUOM: s.currentUOM,
                itemImage: s.itemImage,
                swatchImage: s.swatchImage,
                thumbImage: s.thumbImage,
                auxiliaryImages: s.auxiliaryImages,
            }))
            ;
        const variations = this.getVariations(source);
        return {

            // name, brand, itemNumber,
            product,
            specification
            // currentSKUNo,
            // SKUs,
            // variations,
        };
    }

    constructor() {
        this.source = getProductExample();

        // this.setCurrentSku("22719");

        /*
        product
            currentSKU
            productId
            manufactureNumber
            shortDesc

        images[]
        skuList[]
            variations
                color

        colorOptions[]
            itemNumber
            image
            colors[]
        */

    }

    getVariations(source: ItemResponse) {
        return Object.entries(source.variations)
            .map(([name, options]) => ({
                name,
                selectedValue: null,
                options: Object.keys(options).sort()
            }))
            .filter(v => v.name !== 'color');
    }

    setCurrentSku(newSku: string) {
        this.currentSKUNo = newSku;
    }
}

interface Variation {
    name: string;
    selectedValue: string | null;
    options: string[];
}


interface ColorOption {
    itemNumber: string;
    colors: Color[];
}

interface Color {
    code: string | null;
    name: string;
}
