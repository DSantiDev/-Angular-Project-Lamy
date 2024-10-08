import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm!: FormGroup;
  
  constructor(){
    this.productForm = new FormGroup({
      name: new FormControl('', [ Validators.required]),
      description: new FormControl(''),
      price: new FormControl(0, [ Validators.required, Validators.min(0)]),
      quantity: new FormControl(1, [ Validators.required, Validators.min(1)]),
      category: new FormControl('non-category', [ Validators.required]),
      urlImage: new FormControl('')
    });
  };

  onSubmit() {
    if ( this.productForm.valid ) {
      const formData = this.productForm.value 
      console.log( this.productForm.value );
      this.productForm.reset();
    }

  }
}
