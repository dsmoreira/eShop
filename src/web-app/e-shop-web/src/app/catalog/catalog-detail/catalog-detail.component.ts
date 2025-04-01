import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { BasketService } from '../../services/basket.service';
import { CatalogItem } from '../../models/catalog.model';

@Component({
  selector: 'app-catalog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.scss']
})
export class CatalogDetailComponent implements OnInit {
  item: CatalogItem | null = null;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private basketService: BasketService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadCatalogItem(Number(id));
      }
    });
  }

  loadCatalogItem(id: number): void {
    this.catalogService.getCatalogItem(id).subscribe(item => {
      this.item = item;
    });
  }

  addToCart(): void {
    if (this.item) {
      this.basketService.addItemToBasket(this.item.id, this.quantity).subscribe();
    }
  }

  incrementQuantity(): void {
    if (this.item && this.quantity < this.item.availableStock) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getProductImageUrl(): string {
    return this.item ? this.catalogService.getProductImageUrl(this.item.id) : '';
  }
}
