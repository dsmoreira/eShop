import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogItem } from '../../models/catalog.model';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent {
  @Input() item!: CatalogItem;

  constructor(
    private basketService: BasketService,
    private router: Router
  ) {}

  addToCart(): void {
    this.basketService.addItemToBasket(this.item.id).subscribe();
  }

  navigateToDetail(): void {
    this.router.navigate(['/item', this.item.id]);
  }

  getProductImageUrl(): string {
    return this.item.pictureUri;
  }
}
