import { Component, OnInit } from '@angular/core';
import { PanierService, ArticleInfo } from '../panier.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
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
}
