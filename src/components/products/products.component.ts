import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: ProductModel[] = [];

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  ngOnInit(): void {
  }

  private getProducts() {
    this.http.get<{ [key: string]: ProductModel }>('https://onlinemobileshop-d12cd.firebaseio.com/Products.json')
      .pipe(
        map(responceData => {
          const productArray: ProductModel[] = [];
          for (const key in responceData) {
            if (responceData.hasOwnProperty(key)) {
              productArray.push({ ...responceData[key], id: key });
            }
          }
          return productArray;
        })
      )
      .subscribe(responceData => {
        this.productList = responceData;
      });
  }
}
