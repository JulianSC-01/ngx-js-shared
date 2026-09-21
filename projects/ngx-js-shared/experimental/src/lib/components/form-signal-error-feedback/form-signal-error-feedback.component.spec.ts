import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTree, form } from '@angular/forms/signals';
import { beforeEach, describe, expect, test } from "vitest";
import { FormSignalErrorFeedbackComponent } from './form-signal-error-feedback.component';

interface SignalTestForm {
  formControlText: string;
}

describe('FormSignalErrorFeedbackComponent', () => {
  let component: FormSignalErrorFeedbackComponent<string>;
  let fixture: ComponentFixture<FormSignalErrorFeedbackComponent<string>>;

  let signalForm: FieldTree<SignalTestForm>;

  const signalFormModel = signal<SignalTestForm>({
    formControlText: ''
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormSignalErrorFeedbackComponent
      ]
    })
    .compileComponents();

    TestBed.runInInjectionContext(() => {
      signalForm = form(signalFormModel);
    });

    fixture = TestBed.createComponent(
      FormSignalErrorFeedbackComponent<string>);

    component = fixture.componentInstance;

    fixture.componentRef.
      setInput('errorFormField', signalForm.formControlText);

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});
