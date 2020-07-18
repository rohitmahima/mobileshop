import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/models/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @ViewChild('productForm') productForm: NgForm;
  model = new Product();
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onAddProduct(form: NgForm) {
    const product: Product = { ...form.value };
    this.http.post('https://onlinemobileshop-d12cd.firebaseio.com/Products.json', product)
      .subscribe(responceData => {
        console.log(responceData);
      });
    this.productForm.reset();
  }

  onReset() {
    this.productForm.reset();
  }
}

