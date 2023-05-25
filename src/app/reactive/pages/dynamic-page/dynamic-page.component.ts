import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  // Validators
  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.minLength(3) ]  ],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', Validators.required )

  constructor( private fb: FormBuilder ) {}

  // Game list reference
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
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

  // Add To favorite
  onAddToFavorite(): void {
    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    )

    // Clear field
    this.newFavorite.reset();
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  // Verify formArray
  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt( index );
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    // console.log( this.myForm.value )
    ( this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    // clean fields
    this.myForm.reset();
  }

}
