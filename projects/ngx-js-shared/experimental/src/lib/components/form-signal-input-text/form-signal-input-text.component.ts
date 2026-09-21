import { ChangeDetectionStrategy, Component, input, model, numberAttribute } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { FormLabelComponent } from 'ngx-js-shared';
import { FormSignalErrorFeedbackComponent } from '../form-signal-error-feedback/form-signal-error-feedback.component';
import { FormSignalInputBaseDirective } from '../form-signal-input-base/form-signal-input-base.directive';

@Component({
  imports: [
    FormLabelComponent,
    FormSignalErrorFeedbackComponent
  ],
  selector: 'app-form-signal-input-text',
  templateUrl: './form-signal-input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSignalInputTextComponent
  extends FormSignalInputBaseDirective
  implements FormValueControl<string> {
  readonly value =
    model('');

  readonly maxLength =
    input<number | undefined>();
  readonly readonly =
    input(false);

  readonly inputPlaceholder =
    input<string>();
  readonly inputSize =
    input(undefined, {
      transform: (v) =>
        numberAttribute(v, 50)
    });
  readonly inputType =
    input<'text' | 'password'>('text');

  controlChanged(event: Event) {
    const newValue =
      (<HTMLInputElement>event.target).value;

    this.value.set(newValue);
  }
}
