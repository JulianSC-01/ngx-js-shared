import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  FocusService, FormA11yDirective, FormErrorHeaderComponent, FormInputNumberComponent,
  FormInputSelectComponent, FormInputTextComponent, PageHeaderComponent
} from 'ngx-js-shared';

interface ReactiveForm {
  formControlText: FormControl<string>;
  formControlNumber: FormControl<number | null>;
  formControlSelect: FormControl<string>;
  formArray: FormArray<FormControl<string>>;
}

@Component({
  imports: [
    FormA11yDirective,
    FormErrorHeaderComponent,
    FormInputNumberComponent,
    FormInputSelectComponent,
    FormInputTextComponent,
    PageHeaderComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  selector: 'app-form-reactive',
  templateUrl: './app-form-reactive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFormReactiveComponent {
  private readonly focusService =
    inject(FocusService);
  private readonly formBuilder =
    inject(FormBuilder);

  public reactiveForm =
    this.createReactiveForm();

  public formSelectElements =
    signal(['01', '02', '03']);

  public errorMessageMap =
    signal<Record<string, string>>({
      'required' : 'Error: Field is required.',
      'min' : 'Error: Field must be greater than or equal to 0',
      'max' : 'Error: Field must be less than or equal to 99'
  });

  private createReactiveForm() {
    return this.formBuilder.
      group<ReactiveForm>({
      formControlText:
        this.formBuilder.control('', {
          nonNullable: true,
          validators: Validators.required
        }),
      formControlNumber:
        this.formBuilder.control(null, {
          validators: [
            Validators.required,
            Validators.min(0),
            Validators.max(99)
          ]
        }),
      formControlSelect:
        this.formBuilder.control('', {
          nonNullable: true,
          validators: Validators.required
        }),
      formArray:
        this.formBuilder.array<
          FormControl<string>>([])
      });
  }

  addArrayElement() {
    const formArrayElement =
      new FormControl('', {
        nonNullable: true,
        validators: Validators.required
    });

    this.formArray.push(formArrayElement);

    this.focusService.focusElement(
      `#formArrayText${this.formArray.length - 1}`);
  }

  removeArrayElement(index: number) {
    this.formArray.removeAt(index);
    this.focusService.focusElement('#addButton');
  }

  submit() {
    if (this.reactiveForm.valid) {
      alert("Form submitted successfully!");
    }
  }

  get formArray() {
    return this.reactiveForm.controls.formArray;
  }
}