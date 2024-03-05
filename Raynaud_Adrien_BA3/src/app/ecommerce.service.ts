// ecommerce.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticle } from './article.interface';

@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  private apiUrl = 'https://www.eleguen.ovh/api/v1/articles';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this.apiUrl);
  }
}
