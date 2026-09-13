import { DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  AbstractControl, FormArray, FormControl, FormGroup,
  PristineChangeEvent, StatusChangeEvent
} from "@angular/forms";
import { filter } from "rxjs";

export class FormHelper {
  /* istanbul ignore next */
  private constructor() {}

  public static getErrorCountMessage(
    formGroup: FormGroup<any>) {
    let count = this.getErrorCount(formGroup);

    if (count === 1)
      return 'Please correct the error on this page.';
    if (count > 1)
      return `Please correct the ${count} errors on this page.`;

    return '';
  }

  public static getErrorCount(
    form: FormGroup<any> | FormArray<any>) {
    let count = 0;

    for (const field in form.controls) {
      const control = form.get(field);

      if (control instanceof FormGroup ||
          control instanceof FormArray) {
        count += this.getErrorCount(control);
        continue;
      }

      if (FormHelper.isInvalid(
          control as FormControl)) {
        count++;
      }
    }

    return count;
  }

  public static getErrorListener(
    formControl: AbstractControl,
    destroyRef: DestroyRef) {
    return formControl.events.pipe(
      filter(e =>
        e instanceof PristineChangeEvent ||
        e instanceof StatusChangeEvent),
      takeUntilDestroyed(destroyRef)
    );
  }

  public static isInvalid(
    control: AbstractControl) {
    return (
      control.enabled &&
      control.dirty &&
      control.invalid);
  }
}