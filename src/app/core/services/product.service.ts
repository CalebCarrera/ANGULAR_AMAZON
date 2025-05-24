import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'assets/productos.json'; // JSON local

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: string): Observable<Product> {
    return new Observable<Product>((observer) => {
      this.getAll().subscribe((products) => {
        const product = products.find((p) => p.id === id);
        if (product) {
          observer.next(product);
          observer.complete();
        } else {
          observer.error('Producto no encontrado');
        }
      });
    });
  }
}
