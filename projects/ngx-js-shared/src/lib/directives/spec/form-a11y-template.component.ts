import { ChangeDetectionStrategy, Component, input, signal, viewChild } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { FormErrorHeaderComponent } from "../../components/form-error-header/form-error-header.component";
import { FormInputTextComponent } from "../../components/form-input-text/form-input-text.component";
import { FormA11yDirective } from "../form-a11y.directive";

@Component({
  imports: [
    FormA11yDirective,
    FormInputTextComponent,
    FormsModule
  ],
  selector: 'app-form-a11y-template-host',
  template: `
    <form
      appFormA11y
      autocomplete="off"
      #templateForm="ngForm"
      [formErrorHeader]="formErrorHeader()"
      (ngSubmit)="submit()">
      <app-form-input-text
        name="formControlText"
        inputErrorMessageId="formControlTextError"
        inputId="formControlText"
        inputLabelText="FormControl Text Value"
        inputRequired="true"
        [(ngModel)]="formControlText"
        required>
      </app-form-input-text>
      <button
        class="btn btn-primary mb-1"
        type="submit">
        Submit
      </button>
    </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormA11yTemplateHostComponent {
  public readonly formErrorHeader =
    input<FormErrorHeaderComponent>();

  public readonly formControlText =
    signal('');

  public readonly ngForm =
    viewChild.required<NgForm>('templateForm');

  public submit() {
    // Intentionally empty
  }
}