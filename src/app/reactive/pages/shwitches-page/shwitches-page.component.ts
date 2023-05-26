import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './shwitches-page.component.html',
  styles: [
  ]
})
export class ShwitchesPageComponent {

  // Validators
  public myForm: FormGroup = this.fb.group({
    gender: [ '', Validators.required  ],
    wantNotifications: [ false, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  onSave(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    };
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field )
  }

  onSubmit(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    // Clean form
  this.myForm.reset()
  }

}
