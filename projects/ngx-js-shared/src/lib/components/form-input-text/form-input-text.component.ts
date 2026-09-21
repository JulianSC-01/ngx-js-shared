import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { FormErrorFeedbackComponent } from '../form-error-feedback/form-error-feedback.component';
import { FormInputBaseDirective } from '../form-input-base/form-input-base.directive';
import { FormLabelComponent } from '../form-label/form-label.component';

@Component({
  imports: [
    FormErrorFeedbackComponent,
    FormLabelComponent
  ],
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputTextComponent
  extends FormInputBaseDirective {
  readonly inputMaxLength =
    input(undefined, {
      transform: (val) =>
        numberAttribute(val, 50)
    });
  readonly inputPlaceholder =
    input<string>();
  readonly inputSize =
    input(undefined, {
      transform: (val) =>
        numberAttribute(val, 50)
    });
  readonly inputType =
    input<'text' | 'password'>('text');

  controlHasChanged(event: Event) {
    const newValue =
      (<HTMLInputElement>event.target).value;

    this._onChange(newValue);
  }
}