import { ProductModel } from './../models/product.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) {

    }

    GetUpdatedProducts = new EventEmitter();
    GetProducts() {
        return this.http.get<{ [key: string]: ProductModel }>('https://onlinemobileshop-d12cd.firebaseio.com/Products.json')
    }

    AddProduct(product: ProductModel) {
        return this.http.post('https://onlinemobileshop-d12cd.firebaseio.com/Products.json', product);
    }
}