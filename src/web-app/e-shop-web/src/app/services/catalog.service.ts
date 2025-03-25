import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogItem, CatalogResult, CatalogBrand, CatalogItemType } from '../models/catalog.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Se a variável de ambiente API_URL estiver definida, use-a como base para a URL da API
    this.apiUrl = environment.apiUrl ? `${environment.apiUrl}/api/catalog/` : 'api/catalog/';
  }

  getCatalogItem(id: number): Observable<CatalogItem> {
    return this.http.get<CatalogItem>(`${this.apiUrl}items/${id}`);
  }

  getCatalogItems(pageIndex: number, pageSize: number, brand?: number, type?: number): Observable<CatalogResult> {
    let url = `${this.apiUrl}items?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    
    if (brand) {
      url += `&brand=${brand}`;
    }
    
    if (type) {
      url += `&type=${type}`;
    }
    
    return this.http.get<CatalogResult>(url);
  }

  getBrands(): Observable<CatalogBrand[]> {
    return this.http.get<CatalogBrand[]>(`${this.apiUrl}catalogBrands`);
  }

  getTypes(): Observable<CatalogItemType[]> {
    return this.http.get<CatalogItemType[]>(`${this.apiUrl}catalogTypes`);
  }

  getCatalogItemsWithSemanticRelevance(page: number, take: number, text: string): Observable<CatalogResult> {
    const url = `${this.apiUrl}items/withsemanticrelevance?text=${encodeURIComponent(text)}&pageIndex=${page}&pageSize=${take}`;
    return this.http.get<CatalogResult>(url);
  }
}
