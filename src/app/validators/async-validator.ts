import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function asyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return of(control.value).pipe(
    delay(1000), // Simulate async validation delay
    map(value => {
      if (value === 'invalid') {
        return { invalidValue: true }; // Return an error if the value is 'invalid'
      }
      return null; // Return null if the value is valid
    })
  );
}
