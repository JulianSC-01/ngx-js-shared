import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormInputNumberComponent } from "../form-input-number.component";

@Component({
  imports: [
    FormInputNumberComponent,
    ReactiveFormsModule
  ],
  selector: 'app-form-input-number-host',
  template: `
    <app-form-input-number
      [formControl]="control"
      [inputErrorMessageId]="inputErrorMessageId()"
      [inputErrorMessages]="inputErrorMessages()"
      [inputId]="inputId()"
      [inputLabelText]="inputLabelText()"
      [inputMin]="inputMin()"
      [inputMax]="inputMax()"
      [inputStep]="inputStep()"
      [inputReadOnly]="inputReadOnly()">
    </app-form-input-number>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputNumberHostComponent {
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
  protected readonly inputMin =
    input<number | undefined>(undefined);
  protected readonly inputMax =
    input<number | undefined>(undefined);
  protected readonly inputStep =
    input<number | undefined>(undefined);
  protected readonly inputReadOnly =
    input<true>();

  public readonly control: FormControl<number | null>;

  constructor() {
    this.control =
      new FormControl(1, {
        validators: Validators.min(1)
      });
  }
}