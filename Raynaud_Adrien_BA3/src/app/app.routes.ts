import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { PanierComponent } from './panier/panier.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'checkout', component: CheckoutComponent },
];
