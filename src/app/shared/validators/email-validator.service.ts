import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, delay, of } from "rxjs";


@Injectable({ providedIn: 'root'})
export class EmailValidator implements AsyncValidator{

  validate( control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;

    // emit values
    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {

      if ( email === 'enoc@gmail.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        // return;
      }
      // No taken
      subscriber.next( null );
      subscriber.complete();

    }).pipe(
      delay( 2000 )
    )

    return httpCallObservable;
  }
}

// Other ways to validate email

/*
 validate( control: AbstractControl ): Observable<ValidationErrors | null> {

    const email = control.value;

    return of({
      emeilTaken: true
    }). pipe(
      delay( 2000 )
    );
  }
*/

/*
return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
  .pepe(
    map( resp => {
      return ( resp.length === 0 )
        ? null
        : { emailTaken }
    })
  )
  */
