import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: Product[];

  constructor() {
    this.productList = [
      {
        id: '61a550da-10ad-42e9-a783-3d4f0b7419d2',
        name: 'iPhone 11',
        brand: 'iPhone',
        description: 'All-new dual-camera system with Ultra Wide and Night mode. All-day battery. Six new colours. And the A13 Bionic, our fastest chip ever.',
        imgUrl: 'https://cdn.vox-cdn.com/thumbor/Xt4Wo_s37BD4tceJkxVRYjKJV5w=/0x0:1920x1280/920x613/filters:focal(807x487:1113x793):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/61151465/jbareham_171101_2099_A_0088_02.0.jpg',
        price: 10
      }
    ];
  }

  ngOnInit(): void {
  }

}
