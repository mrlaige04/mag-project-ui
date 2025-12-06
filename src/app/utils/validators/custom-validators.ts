import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  public static Match(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      const controlToCompare = parent?.get(controlName);

      if (!control.value || !controlToCompare?.value) {
        return null;
      }

      const isMatch = control.value === controlToCompare?.value;
      return isMatch ? null : { isFieldsMatch: true };
    };
  }
}
