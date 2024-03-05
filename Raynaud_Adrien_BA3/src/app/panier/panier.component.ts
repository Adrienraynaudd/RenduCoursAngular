import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ArticleInfo } from '../panier.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css',
})
export class PanierComponent implements OnInit {
  panier: Map<string, ArticleInfo> = new Map<string, ArticleInfo>();

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.panierService.getPanier().subscribe((panier) => {
      this.panier = panier;
    });
  }
  modifierQuantite(article: ArticleInfo, quantite: any): void {
    this.panierService.modifierQuantite(article.id, quantite);
  }

  supprimerArticle(articleId: string): void {
    this.panierService.supprimerDuPanier(articleId);
  }

  viderPanier(): void {
    if (confirm('Êtes-vous sûr de vouloir vider le panier?')) {
      this.panierService.viderPanier();
    }
  }

  getTotalPanierPrice(): number {
    let totalPrice = 0;
    for (const [articleId, articleInfo] of this.panier) {
      totalPrice += articleInfo.totalPrice;
    }
    return totalPrice;
  }
}
