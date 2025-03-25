import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CatalogItem, CatalogResult } from '../../models/catalog.model';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';
import { CatalogSearchComponent } from '../catalog-search/catalog-search.component';

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CatalogItemComponent, CatalogSearchComponent],
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {
  catalogResult: CatalogResult | null = null;
  brandId: number | null = null;
  itemTypeId: number | null = null;
  page = 1;
  pageSize = 9;

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'] ? Number(params['page']) : 1;
      this.brandId = params['brand'] ? Number(params['brand']) : null;
      this.itemTypeId = params['type'] ? Number(params['type']) : null;
      this.loadCatalogItems();
    });
  }

  loadCatalogItems(): void {
    this.catalogService.getCatalogItems(
      this.page - 1,
      this.pageSize,
      this.brandId || undefined,
      this.itemTypeId || undefined
    ).subscribe(result => {
      this.catalogResult = result;
    });
  }

  getVisiblePageIndexes(): number[] {
    if (!this.catalogResult) return [];
    
    const pageCount = Math.ceil(this.catalogResult.count / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  navigateToPage(pageIndex: number): void {
    const queryParams: any = {};
    
    if (pageIndex > 1) {
      queryParams.page = pageIndex;
    }
    
    if (this.brandId) {
      queryParams.brand = this.brandId;
    }
    
    if (this.itemTypeId) {
      queryParams.type = this.itemTypeId;
    }
    
    this.router.navigate(['/'], { queryParams });
  }
}
