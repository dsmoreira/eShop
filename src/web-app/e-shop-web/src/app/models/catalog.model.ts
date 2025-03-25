export interface CatalogItem {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUri: string;
  catalogBrandId: number;
  catalogBrand: string;
  catalogTypeId: number;
  catalogType: string;
  availableStock: number;
}

export interface CatalogBrand {
  id: number;
  brand: string;
}

export interface CatalogItemType {
  id: number;
  type: string;
}

export interface CatalogResult {
  count: number;
  data: CatalogItem[];
  pageIndex: number;
  pageSize: number;
} 