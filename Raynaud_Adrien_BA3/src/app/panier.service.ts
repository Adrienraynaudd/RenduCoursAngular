// panier.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IArticle } from './article.interface';

export interface ArticleInfo {
  quantity: number;
  imageUrl: string;
  name: string;
}

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

  ajouterAuPanier(article: IArticle, quantite: number): void {
    const articleId = article['Unique Entry ID'];
    if (this.panier.has(articleId)) {
      const articleInfo = this.panier.get(articleId)!;
      this.panier.set(articleId, {
        ...articleInfo,
        quantity: articleInfo.quantity + quantite,
      });
    } else {
      this.panier.set(articleId, {
        quantity: quantite,
        imageUrl: article['Closet Image'],
        name: article.Name,
      });
    }
    this.panierSubject.next(this.panier);
  }

  supprimerDuPanier(articleId: string): void {
    this.panier.delete(articleId);
    this.panierSubject.next(this.panier);
  }
}
