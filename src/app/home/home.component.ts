import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductOfferComponent } from '../shared/components/product-offer/product-offer.component';
import { Product } from '../shared/model/product';
import { ProductsService } from '../core/services/product.service';
import { HomeProductComponent } from './components/home-product/home-product.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeProductLoadingComponent } from './components/home-product-loading/home-product-loading.component';
import { AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    ProductOfferComponent, 
    HomeProductComponent, 
    RouterLink, 
    HomeProductLoadingComponent, 
    CommonModule,
    NgClass
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productsService = inject(ProductsService);
  products?: Product[];
  productsOffers: Product[] = [];
  private flowbiteInitialized = false;
  currentSlide = 0;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
      this.productsOffers = this.products.filter(
        (product) => product.previousPrice
      );
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.productsOffers.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.productsOffers.length) % this.productsOffers.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }

  ngAfterViewInit(): void {
    if (!this.flowbiteInitialized) {
      setTimeout(() => {
        initFlowbite();
        this.flowbiteInitialized = true;
      }, 200);
    }
  }
}