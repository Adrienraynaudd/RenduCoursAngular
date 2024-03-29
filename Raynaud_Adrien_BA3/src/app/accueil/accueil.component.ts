import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EcommerceService } from '../ecommerce.service';
import { IArticle } from '../article.interface';
import { CommonModule } from '@angular/common';
import { PanierService } from '../panier.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { SuccessErrorMessageService } from '../message.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    CheckoutComponent,
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css',
})
export class AccueilComponent implements OnInit {
  successMessage: string | null = null;
  constructor(
    private ecommerceService: EcommerceService,
    private panierService: PanierService,
    private successErrorMessageService: SuccessErrorMessageService
  ) {}
  ngOnInit(): void {
    this.ecommerceService.getArticles().subscribe((data) => {
      this.articles = data;
    });
    this.successErrorMessageService.successMessage$.subscribe((message) => {
      this.successMessage = message;
    });
  }

  articles: IArticle[] = [];
  addToCart(article: IArticle, event: Event): void {
    const tileElement = (event.target as HTMLElement).closest('.tile');
    if (tileElement) {
      const quantityInput = tileElement.querySelector(
        'input[type="number"]'
      ) as HTMLInputElement;
      if (quantityInput) {
        const quantity = parseInt(quantityInput.value, 10);
        console.log(
          'Article ajouté au panier:',
          article,
          'Quantité:',
          quantity
        );
        if (quantity > 0) {
          this.panierService.addPanier(article, quantity);
        }
      } else {
        console.error('Input de quantité non trouvé.');
      }
    } else {
      console.error('Élément .tile parent non trouvé.');
    }
  }
  removeFromCart(article: IArticle): void {
    this.panierService.deletePanier(article['Unique Entry ID']);
  }

  isInCart(article: IArticle): boolean {
    return this.panierService.isInPanier(article);
  }
}
