import { booleanAttribute, computed, DestroyRef, Directive, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { FormHelper } from '../../util/form.helper';

/* istanbul ignore start -- @preserve */
@Directive()
export abstract class FormInputBaseDirective
  implements ControlValueAccessor, OnInit {
/* istanbul ignore stop -- @preserve */
  private readonly destroyRef =
    inject(DestroyRef);
  private readonly ngControl =
    inject(NgControl, { self: true });

  readonly inputErrorMessageId =
    input<string>();
  readonly inputErrorMessages =
    input<Record<string, string>>({});
  readonly inputId =
    input<string>();
  readonly inputLabelInvisible =
    input(false, {
      transform: booleanAttribute
    });
  readonly inputLabelText =
    input<string>();
  readonly inputReadOnly =
    input<true>();
  readonly inputRequired =
    input(false, {
      transform: booleanAttribute
    });

  readonly controlDisabled =
    signal(false);
  readonly controlIsInvalid =
    signal(false);
  readonly formControl =
    signal<AbstractControl>(
      new FormControl());

  readonly hasErrorMessages =
    computed(() => Object.keys(
      this.inputErrorMessages()).length > 0);

  /* istanbul ignore start */
  readonly input =
    viewChild.required<ElementRef>('input');
  /* istanbul ignore stop */

  _onChange: any;
  _onTouched: any;

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.formControl.set(
      this.ngControl.control!);

    FormHelper.getErrorListener(
      this.formControl(),
      this.destroyRef).
      subscribe(event => {
        this.controlIsInvalid.set(
          FormHelper.isInvalid(event.source));
      });
  }

  registerOnChange(fn: (val: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.controlDisabled.set(isDisabled);
  }

  writeValue(obj: any) {
    this.input().nativeElement.value = obj;
  }

  abstract controlHasChanged(event: Event): void;
}