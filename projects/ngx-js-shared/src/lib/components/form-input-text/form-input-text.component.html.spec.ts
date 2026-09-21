import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FormInputTextComponent } from './form-input-text.component';
import { FormInputTextHostComponent } from './spec/form-input-text-host.component';

describe('FormInputTextComponent - html', () => {
  let component: FormInputTextComponent;
  let fixture: ComponentFixture<FormInputTextHostComponent>;

  let fixtureDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormInputTextComponent,
        FormInputTextHostComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputTextHostComponent);
    fixtureDebugElement = fixture.debugElement.children[0];

    component = fixtureDebugElement.componentInstance;

    await fixture.whenStable();
  });

  test('should have no label', () => {
    const labelElement = fixtureDebugElement.
      query(By.css('app-form-label'));

    expect(labelElement).toBeNull();
  });

  test('should have label', async () => {
    fixture.componentRef.
      setInput('inputLabelText', 'Label');

    await fixture.whenStable();

    const labelElement = fixtureDebugElement.
      query(By.css('app-form-label'));

    expect(labelElement).toBeTruthy();

    const labelHtmlElement =
      labelElement.nativeElement as HTMLElement;

    expect(labelHtmlElement.textContent.trim()).
      toBe('Label');
  });

  test('should have input - defaults', () => {
    const inputElement = fixtureDebugElement.
      query(By.css('input'));

    expect(inputElement).toBeTruthy();

    const inputHtmlElement =
      inputElement.nativeElement as HTMLInputElement;

    expect(inputHtmlElement.className).
      toBe('form-control');
    expect(inputHtmlElement.hasAttribute('aria-describedby')).
      toBe(false);
    expect(inputHtmlElement.getAttribute('aria-invalid')).
      toBe('false');
    expect(inputHtmlElement.hasAttribute('disabled')).
      toBe(false);
    expect(inputHtmlElement.hasAttribute('id')).
      toBe(false);
    expect(inputHtmlElement.getAttribute('maxLength')).
      toBe('50');
    expect(inputHtmlElement.hasAttribute('placeholder')).
      toBe(false);
    expect(inputHtmlElement.getAttribute('size')).
      toBe('50');
    expect(inputHtmlElement.getAttribute('type')).
      toBe('text');
    expect(inputHtmlElement.classList.contains('is-invalid')).
      toBe(false);
    expect(inputHtmlElement.classList.contains('mb-1')).
      toBe(false);
  });

  test('should have input - custom', async () => {
    fixture.componentRef.setInput(
      'inputErrorMessageId', 'input-error');
    fixture.componentRef.setInput(
      'inputErrorMessages', {
        'required' : 'Error: Field is required.'
      });
    fixture.componentRef.setInput(
      'inputId', 'input-id');
    fixture.componentRef.setInput(
      'inputMaxLength', 10);
    fixture.componentRef.setInput(
      'inputPlaceholder', 'Enter a value');
    fixture.componentRef.setInput(
      'inputSize', 10);
    fixture.componentRef.setInput(
      'inputReadOnly', true);

    component.controlDisabled.set(true);
    component.controlIsInvalid.set(true);

    await fixture.whenStable();

    const inputElement = fixtureDebugElement.
      query(By.css('input'));

    expect(inputElement).toBeTruthy();

    const inputHtmlElement =
      inputElement.nativeElement as HTMLInputElement;

    expect(inputHtmlElement.getAttribute('aria-describedby')).
      toBe('input-error');
    expect(inputHtmlElement.getAttribute('aria-invalid')).
      toBe('true');
    expect(inputHtmlElement.hasAttribute('disabled')).
      toBe(true);
    expect(inputHtmlElement.getAttribute('id')).
      toBe('input-id');
    expect(inputHtmlElement.getAttribute('maxLength')).
      toBe('10');
    expect(inputHtmlElement.getAttribute('placeholder')).
      toBe('Enter a value');
    expect(inputHtmlElement.getAttribute('size')).
      toBe('10');
    expect(inputHtmlElement.hasAttribute('readonly')).
      toBe(true);
    expect(inputHtmlElement.getAttribute('type')).
      toBe('text');
    expect(inputHtmlElement.classList.contains('form-control')).
      toBe(true);
    expect(inputHtmlElement.classList.contains('is-invalid')).
      toBe(true);
    expect(inputHtmlElement.classList.contains('mb-1')).
      toBe(true);
  });

  test('should have no error feedback', () => {
    const feedbackElement = fixtureDebugElement.
      query(By.css('app-form-error-feedback'));

    expect(feedbackElement).toBeNull();
  });

  test('should have error feedback', async () => {
    fixture.componentRef.setInput(
      'inputErrorMessages', {
        'required' : 'Error: Field is required.'
      });

    await fixture.whenStable();

    const feedbackElement = fixtureDebugElement.
      query(By.css('app-form-error-feedback'));

    expect(feedbackElement).toBeTruthy();
  });

  test('should emit blur', () => {
    vi.spyOn(component, '_onTouched');

    const inputElement = fixtureDebugElement.
      query(By.css('input'));

    expect(inputElement).toBeTruthy();

    inputElement.triggerEventHandler(
      'blur');

    expect(component._onTouched).
      toHaveBeenCalled();
  });

  test('should emit input', () => {
    vi.spyOn(component, '_onChange');

    const inputElement = fixtureDebugElement.
      query(By.css('input'));

    expect(inputElement).toBeTruthy();

    const mockEvent: unknown = {
      target: {
        value: 'Test',
      }
    }

    inputElement.triggerEventHandler(
      'input', mockEvent);

    expect(component._onChange).
      toHaveBeenCalledWith('Test');
  });
});