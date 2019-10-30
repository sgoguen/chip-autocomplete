
export interface ItemResponse {
    result?: any;
    product: Product;
    message: string | null;
    specification: ProductSpecifications;
    resource: ProductResources;
    currentSKU: ProductSkuResponse;
    skuList: ProductSkuResponse[];
    variations: Record<string, Record<string, string[]>>;
}

export interface Product {
    productImage: string;
    relatedProducts: any;
    categories: ProductCategory[];
    shortDesc: string | null;
    longDesc: string;
    itemNumber: string;
    manufactureNumber: string;
    hoverAttributes?: ProductHoverAttributes;
    productName: string;
    url?: string | null;
    productId: string;
    baseProductName: string;
    brand: string;
    internalProductName: string;
    skuList: ProductSkuResponse[] | null;
}

export interface ProductCategory {
    categoryName: string;
    categoryId: string;
    facetId?: string;
}

export interface ProductHoverAttributes {
    sellingUom: string;
    piecesPerUom: string;
    coverageUom: string;
    ppCoverageUom: string;
    lengthExposure: string;
    widthExposure: string;
    lengthHover: string;
    widthHover: string;
    ncpSellingUom: string;
    gcpSellingUom: string;
    sslvoDimensionIn: string;
    sswhoDimensionOption1In: string;
    sswhoDimensionOption2In: string;
    sswhoDimensionOption3In: string;
    lslvoDimensionIn: string;
    lswhoDimensionIn: string;
    rvlvoDimensionIn: string;
    rvwhoDimensionIn: string;
    nfvaHover: string;
    nfvaUomHover: string;
    fhLapIn: string;
    fvLapIn: string;
    chLapIn: string;
    cvLapIn: string;
    cfmValue: string;
    cfmUom: string;
}

export interface ProductSkuResponse {
    currentUOM: string;
    auxiliaryImages: ([
        {
            videoUrl?: string,
            image: string
        }
    ]) | null;
    manufactureNumber?: string;
    skuShortDesc: string | null;
    itemNumber: string;
    swatchImage?: string;
    thumbImage?: string;
    productNumber?: string;
    hoverAttributes?: any;
    uomlist?: string[];
    itemImage: string;
    /**
     * Currently this is only used for color.  So it is of form
     * variations: {
     *  color: [
     *    "string"
     *  ]
     * }
     */
    variations: Record<string, string[]>;
    // variations: {
    //     [key: string]: {
    //         [key: string]: (string | string[])
    //     }
    // };
}

export interface ProductSpecifications {
    [key: string]: string;
}

export interface ProductResources {
    [key: string]: string;
}
