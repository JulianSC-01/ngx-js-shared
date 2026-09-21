import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormInputTextComponent } from "../form-input-text.component";

@Component({
  imports: [
    FormInputTextComponent,
    ReactiveFormsModule
  ],
  selector: 'app-form-input-text-host',
  template: `
    <app-form-input-text
      [formControl]="control"
      [inputErrorMessageId]="inputErrorMessageId()"
      [inputErrorMessages]="inputErrorMessages()"
      [inputId]="inputId()"
      [inputLabelText]="inputLabelText()"
      [inputMaxLength]="inputMaxLength()"
      [inputPlaceholder]="inputPlaceholder()"
      [inputReadOnly]="inputReadOnly()"
      [inputSize]="inputSize()">
    </app-form-input-text>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputTextHostComponent {
  protected readonly inputErrorMessageId =
    input<string>();
  protected readonly inputErrorMessages =
    input<Record<string, string>>({});
  protected readonly inputId =
    input<string>();
  protected readonly inputLabelText =
    input('');
  protected readonly inputMaxLength =
    input<number | undefined>(undefined);
  protected readonly inputPlaceholder =
    input<string>();
  protected readonly inputSize =
    input<number | undefined>(undefined);
  protected readonly inputReadOnly =
    input<true>();

  public readonly control: FormControl<string>;

  constructor() {
    this.control =
      new FormControl('Julian', {
        nonNullable: true,
        validators: Validators.required
      });
  }
}