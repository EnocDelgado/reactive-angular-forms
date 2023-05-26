import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
// import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  // Validators
  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ]  ],
    email: [ '', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ], [ this.emailValidator ] ],
    username: [ '', [ Validators.required, this.validatorsService.cantBeStrider ] ],
    password1: [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required, Validators.minLength(6) ] ],
  }, {
    // Here it's a reference to all validator e in last dic
    Validators: [
      this.validatorsService.isFieldOneEqualFieldTow('password1', 'password2')
    ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
  ) {}

  IsValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field )
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}
