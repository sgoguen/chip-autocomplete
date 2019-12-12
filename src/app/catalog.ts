import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as faker from 'faker';

export class Catalog {
    private readonly products = generateCatalog();
    public readonly search = new BehaviorSubject<string[]>([]);
    public readonly foundProducts = this.search.pipe(map(terms => this.products.filter(p => hasKeywords(p, terms))));
    public readonly keywords = combineLatest([this.foundProducts, this.search]).pipe(
        map(([products, searchTerms]) => {
            const keywords = new Set(getKeywords(products));
            for (const t of searchTerms) {
                keywords.delete(t);
            }
            return Array.from(keywords);
        })
    );

    addSearch(searchTerm: string) {
        const newSearch = this.search.value.map(i => i).concat(searchTerm);
        this.search.next(newSearch);
    }

    removeSearch(searchTerm: string) {
        const newSearch = this.search.value.filter(i => i !== searchTerm);
        this.search.next(newSearch);
    }
}

export function getKeywords(products: Product[]): string[] {
    const keywords = new Set<string>();

    for (const item of products) {
        for (const keyword of getProductKeywords(item)) {
            keywords.add(keyword);
        }
    }

    return Array.from(keywords.keys()).sort();
}

function getProductKeywords(item: Product) {
    return new Set<string>([
        item.product.toLowerCase(),
        item.color.toLowerCase(),
        item.adjective.toLowerCase(),
    ]);
}

export function hasKeywords(item: Product, searchKeywords: string[]): boolean {
    const productKeywords = getProductKeywords(item);
    return searchKeywords.every(k => productKeywords.has(k));
}

export function generateCatalog(): Product[] {
    // faker.seed(123);
    const catalog = [];
    for (let id = 1; id <= 100; id++) {
        const product = faker.commerce.product();
        const color = faker.commerce.color();
        const adjective = faker.commerce.productAdjective();
        catalog.push({ id, product, color, adjective });
    }
    return catalog;
}

interface Product {
    id: number;
    product: string;
    color: string;
    adjective: string;
}
