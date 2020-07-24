import { ProductService } from './../../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/models/product.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: ProductModel[] = [];

  constructor(private productService: ProductService) {
    this.getProducts();
    this.productService.GetUpdatedProducts.subscribe(x => {
      this.getProducts();
    });
  }

  ngOnInit(): void {
  }

  private getProducts() {
    this.productService.GetProducts()
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
