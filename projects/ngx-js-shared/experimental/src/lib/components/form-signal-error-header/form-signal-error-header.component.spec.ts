import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTree, form } from '@angular/forms/signals';
import { beforeEach, describe, expect, test } from "vitest";
import { FormSignalErrorHeaderComponent } from './form-signal-error-header.component';

interface SignalTestForm {
  formControlText: string;
}

describe('FormSignalErrorHeaderComponent', () => {
  let component: FormSignalErrorHeaderComponent<SignalTestForm>;
  let fixture: ComponentFixture<FormSignalErrorHeaderComponent<SignalTestForm>>;

  let signalForm: FieldTree<SignalTestForm>;

  const signalFormModel = signal<SignalTestForm>({
    formControlText: ''
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormSignalErrorHeaderComponent
      ]
    })
    .compileComponents();

    TestBed.runInInjectionContext(() => {
      signalForm = form(signalFormModel);
    });

    fixture = TestBed.createComponent(
      FormSignalErrorHeaderComponent<SignalTestForm>);

    component = fixture.componentInstance;

    fixture.componentRef.
      setInput('errorFormRoot', signalForm);

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});