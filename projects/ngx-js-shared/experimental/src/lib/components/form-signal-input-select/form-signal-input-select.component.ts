import { booleanAttribute, ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { FormLabelComponent } from 'ngx-js-shared';
import { FormSignalErrorFeedbackComponent } from '../form-signal-error-feedback/form-signal-error-feedback.component';
import { FormSignalInputBaseDirective } from '../form-signal-input-base/form-signal-input-base.directive';

const DEFAULT_EMPTY_OPTION_TEXT = 'Select';

@Component({
  imports: [
    FormLabelComponent,
    FormSignalErrorFeedbackComponent
  ],
  selector: 'app-form-signal-input-select',
  templateUrl: './form-signal-input-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSignalInputSelectComponent
  extends FormSignalInputBaseDirective
  implements FormValueControl<string> {
  readonly value =
    model('');

  readonly inputEmptyOption =
    input(true, {
      transform: booleanAttribute
    });
  readonly inputEmptyOptionText =
    input(DEFAULT_EMPTY_OPTION_TEXT);

  controlChanged(event: Event) {
    const newValue =
      (<HTMLSelectElement>event.target).value;

    this.value.set(newValue);
  }
}
