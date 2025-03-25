export interface BasketItem {
  id: string;
  productId: number;
  productName: string;
  unitPrice: number;
  oldUnitPrice: number;
  quantity: number;
  pictureUrl: string;
}

export interface Basket {
  buyerId: string;
  items: BasketItem[];
}

export interface Order {
  orderId: string;
  date: Date;
  status: string;
  total: number;
  description: string;
  address: Address;
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  unitPrice: number;
  units: number;
  pictureUrl: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
} 