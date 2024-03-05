import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcommerceService } from '../ecommerce.service';
import { IUser } from '../User.interface';
import { PanierService } from '../panier.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessErrorMessageService } from '../message.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private ecommerceService: EcommerceService,
    private panierService: PanierService,
    private router: Router,
    private successErrorMessageService: SuccessErrorMessageService
  ) {
    this.checkoutForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      adress: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required],
      card: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardDate: ['', Validators.required],
    });
  }

  get formControls() {
    return this.checkoutForm.controls;
  }

  onCancel(): void {
    this.panierService.clearPanier();
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    const userData: IUser = {
      lastname: this.formControls['lastname'].value,
      firstname: this.formControls['firstname'].value,
      adress: this.formControls['adress'].value,
      zipcode: this.formControls['zipcode'].value,
      city: this.formControls['city'].value,
      card: this.formControls['card'].value,
      cardDate: this.formControls['cardDate'].value,
    };
    const articlesMap = this.panierService.getPanierSansImage().value;
    const articlesArray = Array.from(articlesMap.values()).map(
      (articleInfo) => ({
        id: articleInfo.id,
        quantity: articleInfo.quantity,
        name: articleInfo.name,
        price: articleInfo.price,
        totalPrice: articleInfo.totalPrice,
      })
    );

    this.ecommerceService.placeOrder(articlesArray, userData).subscribe({
      next: () => {
        this.panierService.clearPanier();
        this.successErrorMessageService.setSuccessMessage(
          'Commande passée avec succès!'
        );
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage =
          "Une erreur s'est produite lors de la soumission de la commande.";
      },
    });
  }
}
