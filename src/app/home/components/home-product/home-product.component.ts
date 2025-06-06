import { Component, input } from '@angular/core';
import { Product } from '../../../shared/model/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-product',
  imports: [NgOptimizedImage, RouterLink, CurrencyPipe],
  templateUrl: './home-product.component.html',
})
export class HomeProductComponent {
  product = input.required<Product>();
}