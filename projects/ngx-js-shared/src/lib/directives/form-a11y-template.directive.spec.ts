import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgForm } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { FormErrorHeaderComponent } from "../components/form-error-header/form-error-header.component";
import { FormA11yDirective } from "./form-a11y.directive";
import { FormA11yTemplateHostComponent } from "./spec/form-a11y-template.component";

describe('FormA11yTemplateDirective', () => {
  let component: FormA11yTemplateHostComponent;
  let fixture: ComponentFixture<FormA11yTemplateHostComponent>;

  let formDebugElement: DebugElement;
  let ngForm: NgForm;

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
        FormA11yTemplateHostComponent
      ]
    });

    fixture = TestBed.createComponent(FormA11yTemplateHostComponent);
    component = fixture.componentInstance;

    ngForm = component.ngForm();

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
  });

  test('should create', () => {
    expect(component).toBeDefined();
    expect(ngForm).toBeDefined();
  });

  test('should submit no error header', async () => {
    fixture.componentRef.setInput(
      'formErrorHeader', undefined);

    await fixture.whenStable();

    formDebugElement.
      triggerEventHandler('submit');

    await fixture.whenStable();

    expect(ngForm.dirty).
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

    expect(ngForm.dirty).
      toBeTruthy();

    expect(mockFormErrorHeader.clearErrors).
      not.toHaveBeenCalledOnce();
    expect(mockFormErrorHeader.countErrors).
      toHaveBeenCalledOnce();
  });

  test('should submit valid', async () => {
    component.formControlText.
      set('Julian');

    await fixture.whenStable();

    formDebugElement.
      triggerEventHandler('submit');

    await fixture.whenStable();

    expect(ngForm.pristine).
      toBeTruthy();

    expect(mockFormErrorHeader.clearErrors).
      toHaveBeenCalledOnce();
    expect(mockFormErrorHeader.countErrors).
      not.toHaveBeenCalledOnce();
  });
});