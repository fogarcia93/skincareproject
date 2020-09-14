import { Product } from './product';

export class PurchaseOrder {
    id?: string;
    detail: Array<Product>;
}