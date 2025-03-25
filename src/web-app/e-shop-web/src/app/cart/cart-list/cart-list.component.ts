import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { Basket, BasketItem } from '../../models/basket.model';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  basket: Basket | null = null;

  constructor(
    private basketService: BasketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.basketService.basket$.subscribe(basket => {
      this.basket = basket;
    });
  }

  getTotal(): number {
    if (!this.basket) return 0;
    
    return this.basket.items.reduce((total, item) => 
      total + (item.quantity * item.unitPrice), 0);
  }

  updateQuantity(item: BasketItem, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(item);
    } else {
      this.basketService.updateItemQuantity(item.productId, quantity).subscribe();
    }
  }

  removeItem(item: BasketItem): void {
    this.basketService.removeItemFromBasket(item.productId).subscribe();
  }

  clearCart(): void {
    this.basketService.clearBasket().subscribe();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
