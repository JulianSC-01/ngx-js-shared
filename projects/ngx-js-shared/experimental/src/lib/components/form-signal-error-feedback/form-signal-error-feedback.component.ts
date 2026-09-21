import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Field } from '@angular/forms/signals';

@Component({
  selector: 'app-form-signal-error-feedback',
  templateUrl: './form-signal-error-feedback.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSignalErrorFeedbackComponent<T> {
  readonly errorFormField =
    input.required<Field<T>>();
  readonly errorFeedbackId =
    input<string>();

  readonly fieldInvalid =
    computed(() =>
      this.errorFormField()().invalid() &&
      this.errorFormField()().touched());
}
