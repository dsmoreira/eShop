import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CatalogBrand, CatalogItemType } from '../../models/catalog.model';

@Component({
  selector: 'app-catalog-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.scss']
})
export class CatalogSearchComponent implements OnInit {
  @Input() brandId: number | null = null;
  @Input() itemTypeId: number | null = null;

  brands: CatalogBrand[] = [];
  types: CatalogItemType[] = [];
  
  constructor(
    private catalogService: CatalogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadFilters();
  }

  loadFilters(): void {
    this.catalogService.getBrands().subscribe(brands => {
      this.brands = brands;
    });

    this.catalogService.getTypes().subscribe(types => {
      this.types = types;
    });
  }

  applyFilter(brand: number | null, type: number | null): void {
    const queryParams: any = {};
    
    if (brand) {
      queryParams.brand = brand;
    }
    
    if (type) {
      queryParams.type = type;
    }
    
    this.router.navigate(['/'], { queryParams });
  }

  filterByBrand(brandId: number): void {
    this.applyFilter(brandId, this.itemTypeId);
  }

  filterByType(typeId: number): void {
    this.applyFilter(this.brandId, typeId);
  }

  clearFilters(): void {
    this.applyFilter(null, null);
  }

  isBrandSelected(brandId: number): boolean {
    return this.brandId === brandId;
  }

  isTypeSelected(typeId: number): boolean {
    return this.itemTypeId === typeId;
  }
}
