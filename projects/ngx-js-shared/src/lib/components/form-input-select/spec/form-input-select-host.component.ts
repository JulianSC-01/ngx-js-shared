import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormInputSelectComponent } from "../form-input-select.component";

@Component({
  imports: [
    FormInputSelectComponent,
    ReactiveFormsModule
  ],
  selector: 'app-form-input-select-host',
  template: `
    <app-form-input-select
      [formControl]="control"
      [inputEmptyOption]="inputEmptyOption()"
      [inputErrorMessageId]="inputErrorMessageId()"
      [inputErrorMessages]="inputErrorMessages()"
      [inputId]="inputId()"
      [inputLabelText]="inputLabelText()">
      <option value="01">Option 1</option>
      <option value="02">Option 2</option>
    </app-form-input-select>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputSelectHostComponent {
  protected readonly inputEmptyOption =
    input(false);
  protected readonly inputErrorMessageId =
    input<string>();
  protected readonly inputErrorMessages =
    input<Record<string, string>>({});
  protected readonly inputId =
    input<string>();
  protected readonly inputLabelText =
    input('');

  public readonly control: FormControl<string>;

  constructor() {
    this.control =
      new FormControl('01', {
        nonNullable: true,
        validators: Validators.required
      });
  }
}