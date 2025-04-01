import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Basket, BasketItem } from '../models/basket.model';
import { environment } from '../../environments/environment';
import { CatalogService } from './catalog.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiUrl: string;
  private basketSubject = new BehaviorSubject<Basket | null>(null);
  
  basket$ = this.basketSubject.asObservable();

  constructor(private http: HttpClient, private catalogService: CatalogService) { 
    this.apiUrl = environment.basketApiUrl ? `${environment.basketApiUrl}/api/basket/` : 'api/basket/';
  }

  getBasket(buyerId: string): Observable<Basket> {
    return this.http.get<Basket>(`${this.apiUrl}${buyerId}`).pipe(
      tap(basket => this.basketSubject.next(basket))
    );
  }

  addItemToBasket(productId: number, quantity = 1): Observable<Basket> {
    const buyerId = this.getCurrentBasket()?.buyerId || 'testuser';
    const item = {
      productId,
      quantity
    };
    
    return this.http.post<Basket>(`${this.apiUrl}items`, item).pipe(
      tap(basket => this.basketSubject.next(basket))
    );
  }

  updateItemQuantity(productId: number, quantity: number): Observable<Basket> {
    const item = {
      productId,
      quantity
    };
    
    return this.http.put<Basket>(`${this.apiUrl}items`, item).pipe(
      tap(basket => this.basketSubject.next(basket))
    );
  }

  removeItemFromBasket(productId: number): Observable<Basket> {
    return this.http.delete<Basket>(`${this.apiUrl}items/${productId}`).pipe(
      tap(basket => this.basketSubject.next(basket))
    );
  }

  clearBasket(): Observable<any> {
    const buyerId = this.getCurrentBasket()?.buyerId || 'testuser';
    return this.http.delete(`${this.apiUrl}${buyerId}`).pipe(
      tap(() => this.basketSubject.next({ buyerId, items: [] }))
    );
  }

  checkout(address: any): Observable<any> {
    return this.http.post(`${this.apiUrl}checkout`, address).pipe(
      tap(() => this.basketSubject.next({ buyerId: 'testuser', items: [] }))
    );
  }

  getCurrentBasket(): Basket | null {
    return this.basketSubject.value;
  }

  getBasketItemCount(): number {
    const basket = this.basketSubject.value;
    if (!basket) return 0;
    
    return basket.items.reduce((count, item) => count + item.quantity, 0);
  }
}
