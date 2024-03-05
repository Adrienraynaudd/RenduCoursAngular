// panier.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IArticle } from './article.interface';
import { ArticleInfo } from './panier.interface';


@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private panier: Map<string, ArticleInfo> = new Map<string, ArticleInfo>();
  private panierSubject: BehaviorSubject<Map<string, ArticleInfo>> =
    new BehaviorSubject<Map<string, ArticleInfo>>(this.panier);

  constructor() {}

  getPanier(): BehaviorSubject<Map<string, ArticleInfo>> {
    return this.panierSubject;
  }

  addPanier(article: IArticle, quantite: number): void {
    const articleId = article['Unique Entry ID'];
    const prixUnitaire = parseFloat(article.Buy.toString());
    const prixTotal = quantite * prixUnitaire; 
    if (this.panier.has(articleId)) {
      const articleInfo = this.panier.get(articleId)!;
      this.panier.set(articleId, {
        ...articleInfo,
        quantity: articleInfo.quantity + quantite,
        totalPrice: articleInfo.totalPrice + prixTotal,
      });
    } else {
      this.panier.set(articleId, {
        id: articleId,
        quantity: quantite,
        imageUrl: article['Closet Image'],
        name: article.Name,
        price: prixUnitaire,
        totalPrice: prixTotal,
      });
    }
    this.panierSubject.next(this.panier);
  }

  deletePanier(articleId: string): void {
    this.panier.delete(articleId);
    this.panierSubject.next(this.panier);
  }

  modifyQuantite(articleId: string, event: any): void {
    const quantite: number = parseInt(event.target.value, 10);
    if (!isNaN(quantite)) {
        if (this.panier.has(articleId)) {
            const articleInfo = this.panier.get(articleId)!;
            const prixUnitaire = articleInfo.price;
            const prixTotal = quantite * prixUnitaire;
            this.panier.set(articleId, {
                ...articleInfo,
                quantity: quantite,
                totalPrice: prixTotal,
            });
            this.panierSubject.next(this.panier);
        }
    }
}

  clearPanier(): void {
    this.panier.clear();
    this.panierSubject.next(this.panier);
  }
  isInPanier(article: IArticle): boolean {
    const panier = this.getPanier().value;
    return Array.from(panier.values()).some((item: { id: string }) => item.id === article['Unique Entry ID']);
  }
}