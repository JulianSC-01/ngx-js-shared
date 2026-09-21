import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormErrorFeedbackComponent } from '../form-error-feedback/form-error-feedback.component';
import { FormInputBaseDirective } from '../form-input-base/form-input-base.directive';
import { FormLabelComponent } from '../form-label/form-label.component';

const DEFAULT_EMPTY_OPTION_TEXT = 'Select';

@Component({
  imports: [
    FormErrorFeedbackComponent,
    FormLabelComponent
  ],
  selector: 'app-form-input-select',
  templateUrl: './form-input-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputSelectComponent
  extends FormInputBaseDirective {
  readonly inputEmptyOption =
    input(true, {
      transform: booleanAttribute
    });
  readonly inputEmptyOptionText =
    input(DEFAULT_EMPTY_OPTION_TEXT);

  controlHasChanged(event: Event) {
    const newValue =
      (<HTMLSelectElement>event.target).value;

    this._onChange(newValue);
  }
}