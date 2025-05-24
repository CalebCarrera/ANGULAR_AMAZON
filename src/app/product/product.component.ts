import { Component, inject, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../core/services/product.service';
import { Product } from '../shared/model/product';
import { NgOptimizedImage, CommonModule, CurrencyPipe } from '@angular/common';
import { CartProduct } from '../shared/model/cart-product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule], // ← Corregido
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  product?: Product;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productsService.getById(params['id']).subscribe((product) => {
        this.product = product;
      });
    });
  }

  addToCart() {
    const storagedProducts: CartProduct[] =
      JSON.parse(localStorage.getItem('cart-products') as string) || [];

    const matched = storagedProducts.find(
      (cartProduct) => cartProduct.product.id == this.product?.id
    );
    if (matched) {
      matched.quantity++;
      localStorage.setItem('cart-products', JSON.stringify(storagedProducts));
    } else {
      storagedProducts.push({ product: this.product as Product, quantity: 1 });
      localStorage.setItem('cart-products', JSON.stringify(storagedProducts));
    }
  }
}
