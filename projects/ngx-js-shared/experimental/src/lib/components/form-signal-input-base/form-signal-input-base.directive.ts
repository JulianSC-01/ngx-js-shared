import { booleanAttribute, computed, Directive, inject, input, model } from '@angular/core';
import { FormField } from '@angular/forms/signals';

@Directive()
export abstract class FormSignalInputBaseDirective {
  readonly formField =
    inject(FormField, { self: true });

  readonly inputErrorMessageId =
    input<string>();
  readonly inputId =
    input<string>();
  readonly inputLabelInvisible =
    input(false, {
      transform: booleanAttribute
    });
  readonly inputLabelText =
    input<string>();
  readonly inputShowErrors =
    input(true, {
      transform: booleanAttribute
    });

  readonly touched = model(false);

  readonly disabled = input(false);
  readonly invalid  = input(false);
  readonly required = input(false);

  readonly controlInvalid =
    computed(() =>
      this.invalid() && this.touched());

  abstract controlChanged(event : Event): void;

  controlTouched() {
    this.touched.set(true);
  }
}