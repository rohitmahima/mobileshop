import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductModel } from 'src/models/product.model';
import { ProductService } from './../../Services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @ViewChild('productForm') productForm: NgForm;
  model = new ProductModel();
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onAddProduct(form: NgForm) {
    const product: ProductModel = { ...form.value };
    this.productService.AddProduct(product)
      .subscribe(responceData => {
        console.log(responceData);
      });
    this.productForm.reset();
    this.productService.GetUpdatedProducts.emit();
  }

  onReset() {
    this.productForm.reset();
  }
}

