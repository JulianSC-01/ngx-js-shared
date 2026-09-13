import { Directive, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { FormErrorHeaderComponent } from '../components/form-error-header/form-error-header.component';

type FormType =
  FormGroupDirective | NgForm;

@Directive({
  selector: 'form[appFormA11y]'
})
export class FormA11yDirective {
  private readonly reactiveForm =
    inject(FormGroupDirective,
      { optional: true, self: true });
  private readonly templateForm =
    inject(NgForm,
      { optional: true, self: true });

  readonly formErrorHeader =
    input<FormErrorHeaderComponent>();

  constructor() {
    if (this.reactiveForm) {
      this.addSubmissionListener(
        this.reactiveForm);
    } else if (this.templateForm) {
      this.addSubmissionListener(
        this.templateForm);
    } else {
      console.warn(
        'appFormA11y -> No host form found');
    }
  }

  private addSubmissionListener(
    formInstance: FormType) {
    formInstance.ngSubmit.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      const formErrorHeader =
        this.formErrorHeader();

      if (formInstance.invalid) {
        formInstance.form.markAllAsDirty();
      }

      if (formErrorHeader) {
        if (formInstance.invalid) {
          formErrorHeader.countErrors();
        } else {
          formErrorHeader.clearErrors();
        }
      }
    });
  }
}