import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormErrorHeaderComponent } from "../../components/form-error-header/form-error-header.component";
import { FormInputTextComponent } from "../../components/form-input-text/form-input-text.component";
import { FormA11yDirective } from "../form-a11y.directive";

export interface TestReactiveForm {
  formControlText: FormControl<string>;
}

@Component({
  imports: [
    FormA11yDirective,
    FormInputTextComponent,
    ReactiveFormsModule
  ],
  selector: 'app-form-a11y-reactive-host',
  template: `
    <form
      appFormA11y
      autocomplete="off"
      [formErrorHeader]="formErrorHeader()"
      [formGroup]="reactiveForm"
      (ngSubmit)="submit()">
      <app-form-input-text
        formControlName="formControlText"
        inputErrorMessageId="formControlTextError"
        inputLabelText="FormControl Text Value"
        inputId="formControlText"
        inputRequired="true">
      </app-form-input-text>
      <button
        class="btn btn-primary mb-1"
        type="submit">
        Submit
      </button>
    </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormA11yReactiveHostComponent {
  private readonly formBuilder =
    inject(NonNullableFormBuilder);

  public readonly formErrorHeader =
    input<FormErrorHeaderComponent>();

  public readonly reactiveForm: FormGroup<TestReactiveForm>;

  constructor() {
    this.reactiveForm =
      this.formBuilder.
        group<TestReactiveForm>({
        formControlText:
          this.formBuilder.control('', {
            validators: Validators.required
          }),
        });
  }

  public submit() {
    // Intentionally empty
  }
}