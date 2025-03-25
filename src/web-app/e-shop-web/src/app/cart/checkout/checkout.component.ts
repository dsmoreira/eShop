import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { Address } from '../../models/basket.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  submitted = false;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private basketService: BasketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.basketService.basket$.subscribe(basket => {
      if (!basket || basket.items.length === 0) {
        this.router.navigate(['/cart']);
      }
    });

    this.createForm();
  }

  createForm(): void {
    this.checkoutForm = this.formBuilder.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(-[0-9]{4})?$')]]
    });
  }

  get f() { return this.checkoutForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }

    this.processing = true;
    
    const address: Address = {
      street: this.f['street'].value,
      city: this.f['city'].value,
      state: this.f['state'].value,
      country: this.f['country'].value,
      zipCode: this.f['zipCode'].value
    };

    this.basketService.checkout(address).subscribe(
      () => {
        this.router.navigate(['/']);
        // Aqui normalmente redirecionaria para uma página de confirmação
      },
      error => {
        console.error('Erro ao finalizar o pedido', error);
        this.processing = false;
      }
    );
  }

  getTotal(): number {
    const basket = this.basketService.getCurrentBasket();
    if (!basket) return 0;
    
    return basket.items.reduce((total, item) => 
      total + (item.quantity * item.unitPrice), 0);
  }
}
