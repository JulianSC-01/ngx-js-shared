import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormGroup } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { FormErrorHeaderComponent } from "../components/form-error-header/form-error-header.component";
import { FormA11yDirective } from "./form-a11y.directive";
import { FormA11yReactiveHostComponent, TestReactiveForm } from "./spec/form-a11y-reactive.component";

describe('FormA11yReactiveDirective', () => {
  let component: FormA11yReactiveHostComponent;
  let fixture: ComponentFixture<FormA11yReactiveHostComponent>;

  let formDebugElement: DebugElement;
  let reactiveForm: FormGroup<TestReactiveForm>;

  const mockClearErrors = vi.fn();
  const mockCountErrors = vi.fn();

  const mockFormErrorHeader = {
    clearErrors: mockClearErrors,
    countErrors: mockCountErrors
  } as unknown as FormErrorHeaderComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormA11yDirective,
        FormA11yReactiveHostComponent
      ]
    });

    fixture = TestBed.createComponent(FormA11yReactiveHostComponent);
    component = fixture.componentInstance;

    reactiveForm = component.reactiveForm;

    formDebugElement =
      fixture.debugElement.query(By.css('form'));

    fixture.componentRef.setInput(
      'formErrorHeader', mockFormErrorHeader);

    vi.spyOn(mockFormErrorHeader, 'clearErrors');
    vi.spyOn(mockFormErrorHeader, 'countErrors');

    await fixture.whenStable();
  });

  afterEach(() => {
    mockClearErrors.mockClear();
    mockCountErrors.mockClear();

    reactiveForm.reset();
  });

  test('should create', () => {
    expect(component).toBeDefined();
    expect(reactiveForm).toBeDefined();
  });

  test('should submit no error header', async () => {
    fixture.componentRef.setInput(
      'formErrorHeader', undefined);

    await fixture.whenStable();

    formDebugElement.
      triggerEventHandler('submit');

    await fixture.whenStable();

    expect(reactiveForm.dirty).
      toBeTruthy();
    expect(reactiveForm.controls.formControlText.dirty).
      toBeTruthy();

    expect(mockFormErrorHeader.clearErrors).
      not.toHaveBeenCalledOnce();
    expect(mockFormErrorHeader.countErrors).
      not.toHaveBeenCalledOnce();
  });

  test('should submit invalid', async () => {
    formDebugElement.
      triggerEventHandler('submit');

    await fixture.whenStable();

    expect(reactiveForm.dirty).
      toBeTruthy();
    expect(reactiveForm.controls.formControlText.dirty).
      toBeTruthy();

    expect(mockFormErrorHeader.clearErrors).
      not.toHaveBeenCalledOnce();
    expect(mockFormErrorHeader.countErrors).
      toHaveBeenCalledOnce();
  });

  test('should submit valid', async () => {
    reactiveForm.controls.formControlText.
      setValue('Julian');

    formDebugElement.
      triggerEventHandler('submit');

    await fixture.whenStable();

    expect(reactiveForm.pristine).
      toBeTruthy();
    expect(reactiveForm.controls.formControlText.pristine).
      toBeTruthy();

    expect(mockFormErrorHeader.clearErrors).
      toHaveBeenCalledOnce();
    expect(mockFormErrorHeader.countErrors).
      not.toHaveBeenCalledOnce();
  });
});