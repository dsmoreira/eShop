import { Routes } from '@angular/router';
import { CatalogListComponent } from './catalog/catalog-list/catalog-list.component';
import { CatalogDetailComponent } from './catalog/catalog-detail/catalog-detail.component';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: CatalogListComponent },
  { path: 'item/:id', component: CatalogDetailComponent },
  { path: 'cart', component: CartListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' }
];
