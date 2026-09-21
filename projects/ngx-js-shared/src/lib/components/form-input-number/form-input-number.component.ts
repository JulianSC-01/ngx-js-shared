import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { FormErrorFeedbackComponent } from '../form-error-feedback/form-error-feedback.component';
import { FormInputBaseDirective } from '../form-input-base/form-input-base.directive';
import { FormLabelComponent } from '../form-label/form-label.component';

/* istanbul ignore start -- @preserve */
@Component({
  imports: [
    FormErrorFeedbackComponent,
    FormLabelComponent
  ],
  selector: 'app-form-input-number',
  templateUrl: './form-input-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputNumberComponent
  extends FormInputBaseDirective {
/* istanbul ignore stop -- @preserve */
  readonly inputMin =
    input(undefined, {
      transform: (val) =>
        numberAttribute(val, 0)
    });
  readonly inputMax =
    input(undefined, {
      transform: (val) =>
        numberAttribute(val, 100)
    });
  readonly inputStep =
    input(1, {
      transform: (val) =>
        numberAttribute(val, 1)
    });

  controlHasChanged(event: Event) {
    const newValue =
      (<HTMLInputElement>event.target).
        valueAsNumber;

    if (isNaN(newValue)) {
      this._onChange(null);
    } else {
      this._onChange(newValue);
    }
  }
}