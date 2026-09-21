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
  selector: 'app-form-signal-input-number',
  templateUrl: './form-signal-input-number.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSignalInputNumberComponent
  extends FormSignalInputBaseDirective
  implements FormValueControl<number | null> {
  readonly value =
    model<number | null>(null);

  readonly min =
    input<number | undefined>();
  readonly max =
    input<number | undefined>();

  readonly readonly =
    input(false);

  readonly inputPlaceholder =
    input<string>();
  readonly inputStep =
    input(1, {
      transform: (v) =>
        numberAttribute(v, 1)
    });

  controlChanged(event: Event) {
    const newValue =
      (<HTMLInputElement>event.target).
        valueAsNumber;

    if (isNaN(newValue)) {
      this.value.set(null);
    } else {
      this.value.set(newValue);
    }
  }
}
