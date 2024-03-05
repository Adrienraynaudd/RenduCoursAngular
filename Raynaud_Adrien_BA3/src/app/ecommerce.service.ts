// ecommerce.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleInfo, ArticleSansImage } from './panier.interface';
import { IArticle } from './article.interface';
import { IUser } from './User.interface';
@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  private apiUrl = 'https://www.eleguen.ovh/api/v1/articles';
  private apiUrlOrder = 'https://www.eleguen.ovh/api/v1/purchase';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this.apiUrl);
  }
  placeOrder(panier: ArticleSansImage[], user: IUser): Observable<any> {
    return this.http.post<any>(
      this.apiUrlOrder,
      JSON.stringify({ panier, user })
    );
  }
}
