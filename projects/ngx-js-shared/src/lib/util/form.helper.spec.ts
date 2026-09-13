import { DestroyRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { beforeEach, describe, expect, test } from "vitest";
import { FormHelper } from "./form.helper";

interface TestForm {
  formControl: FormControl<string>;
  formGroup: FormGroup<TestSubForm>;
  formArray: FormArray<FormControl<string>>;
}

interface TestSubForm {
  formSubControl: FormControl<string>;
}

describe('FormHelper', () => {
  const formBuilder =
    TestBed.inject(FormBuilder);

  const form = formBuilder.
    group<TestForm>({
    formControl:
      formBuilder.control('', {
        nonNullable: true,
        validators: Validators.required
      }),
    formGroup:
      formBuilder.group<TestSubForm>({
        formSubControl:
          formBuilder.control('', {
            nonNullable: true,
            validators: Validators.required
          }),
      }),
    formArray:
      formBuilder.array<
        FormControl<string>>([
          formBuilder.control('', {
            nonNullable: true,
            validators: Validators.required
          }),
        ])
    });

  beforeEach(() => {
    form.enable();
    form.reset();
  });

  test('should have no errors', () => {
    expect(FormHelper.getErrorCount(form)).
      toBe(0);
    expect(FormHelper.getErrorCountMessage(form)).
      toBe('');
  });

  test('should have 1 error', () => {
    form.controls.formControl.markAsDirty();

    expect(FormHelper.getErrorCount(form)).
      toBe(1);
    expect(FormHelper.getErrorCountMessage(form)).
      toBe('Please correct the error on this page.');
  });

  test('should have 3 errors', () => {
    form.markAllAsDirty();

    expect(FormHelper.getErrorCount(form)).
      toBe(3);
    expect(FormHelper.getErrorCountMessage(form)).
      toBe('Please correct the 3 errors on this page.');
  });

  test('should emit pristine change error event', () => {
    let eventEmitted = false;

    FormHelper.getErrorListener(
      form.controls.formControl,
      TestBed.inject(DestroyRef)).
        subscribe({
          next: () => eventEmitted = true
        });

    form.controls.formControl.markAsDirty();

    expect(eventEmitted).
      toBeTruthy();
  });

  test('should emit status change error event', () => {
    let eventEmitted = false;

    FormHelper.getErrorListener(
      form.controls.formControl,
      TestBed.inject(DestroyRef)).
        subscribe({
          next: () => eventEmitted = true
        });

    form.controls.formControl.setValue('Julian');

    expect(eventEmitted).
      toBeTruthy();
  });

  test('should be valid control pristine', () => {
    expect(FormHelper.isInvalid(form.controls.formControl)).
      toBeFalsy();
  });

  test('should be valid control disabled', () => {
    form.controls.formControl.disable();
    form.controls.formControl.markAsDirty();

    expect(FormHelper.isInvalid(form.controls.formControl)).
      toBeFalsy();
  });

  test('should be valid control', () => {
    form.controls.formControl.setValue('Julian');
    form.controls.formControl.markAsDirty();

    expect(FormHelper.isInvalid(form.controls.formControl)).
      toBeFalsy();
  });

  test('should be invalid control', () => {
    form.controls.formControl.markAsDirty();

    expect(FormHelper.isInvalid(form.controls.formControl)).
      toBeTruthy();
  });
});