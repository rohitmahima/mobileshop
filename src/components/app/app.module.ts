import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app/app.component';
import { HeaderComponent } from '../header/header.component';
import { ProductsComponent } from '../products/products.component';
import { ProductAddComponent } from '../product-add/product-add.component';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { LoadingSpinnerComponent } from './../shared/loading-spinner/loading-spinner.component';

import { ProductService } from './../../Services/product.service';
import { AuthenticationService } from './../../Services/authentication.service';

const appRoutes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'addProduct', component: ProductAddComponent },
  { path: 'authentication', component: AuthenticationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductAddComponent,
    AuthenticationComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
