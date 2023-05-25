import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  // Validators
  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3) ]  ],
    price: [ 0, [ Validators.required, Validators.min(0) ] ],
    inStorage: [ 1, [ Validators.required, Validators.min(0) ]]
  })

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    // Defaulf field values
    this.myForm.reset( { name: '', price: 0, inStorage: 0 });
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }
  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch (key) {
        case 'required':
          return 'Required field';

        case 'minlength':
          return `Minimum ${ errors['minlength'].requiredLength } caracters`;
      }
    }

    return null;
  }

  onSave(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    };

    // console.log( this.myForm.value );

    // Clean form
    this.myForm.reset({ price: 0, inStorage: 1 });

  }
}
