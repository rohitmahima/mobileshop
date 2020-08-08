import { AuthenticationService } from './authentication.service';
import { ProductModel } from './../models/product.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

    token: string;
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        authenticationService.user.subscribe(user => {
            this.token = user.token;
        });
    }

    GetUpdatedProducts = new EventEmitter();
    GetProducts() {
        return this.http.get<{ [key: string]: ProductModel }>('https://onlinemobileshop-2bb04.firebaseio.com/Products.json?auth='
            + this.token);
    }

    AddProduct(product: ProductModel) {
        return this.http.post('https://onlinemobileshop-2bb04.firebaseio.com/Products.json', product);
    }
}