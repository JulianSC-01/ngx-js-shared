import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { beforeEach, describe, expect, test } from "vitest";
import { FormErrorFeedbackComponent } from './form-error-feedback.component';

describe('AppErrorFeedbackComponent', () => {
  let component: FormErrorFeedbackComponent;
  let fixture: ComponentFixture<FormErrorFeedbackComponent>;

  let formControl: FormControl<string>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormErrorFeedbackComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormErrorFeedbackComponent);
    component = fixture.componentInstance;

    formControl =
      new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      });

    fixture.componentRef.
      setInput('errorFeedbackControl', formControl);

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should have error', async () => {
    formControl.markAsDirty();

    await fixture.whenStable();

    expect(component.formControlErrors()).
      toStrictEqual({ required: true });
    expect(component.formControlIsInvalid()).
      toBe(true);
  });

  test('should have no error', async () => {
    formControl.setValue('Julian');
    formControl.markAsDirty();

    await fixture.whenStable();

    expect(component.formControlErrors()).
      toBeNull();
    expect(component.formControlIsInvalid()).
      toBe(false);
  });

  test('should have no error - disabled', async () => {
    formControl.disable();
    formControl.markAsDirty();

    await fixture.whenStable();

    expect(component.formControlErrors()).
      toBeNull();
    expect(component.formControlIsInvalid()).
      toBe(false);
  });
});