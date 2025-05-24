import { Component, OnInit, input } from '@angular/core';
import { Product } from '../../model/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-offer',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, CommonModule],
  templateUrl: './product-offer.component.html',
})
export class ProductOfferComponent implements OnInit {
  product = input.required<Product>();
  discount!: 0 | number;

  ngOnInit(): void {
    const previousPrice = this.product().previousPrice;
    const currentPrice = this.product().price;

    if (previousPrice) {
      this.discount = Math.round(
        ((previousPrice - currentPrice) / previousPrice) * 100
      );
    }
  }
}