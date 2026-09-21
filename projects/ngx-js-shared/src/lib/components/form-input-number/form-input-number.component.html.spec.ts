import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FormInputNumberComponent } from './form-input-number.component';
import { FormInputNumberHostComponent } from './spec/form-input-number-host.component';

describe('FormInputNumberComponent - html', () => {
  let component: FormInputNumberComponent;
  let fixture: ComponentFixture<FormInputNumberHostComponent>;

  let fixtureDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormInputNumberComponent,
        FormInputNumberHostComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputNumberHostComponent);
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
    expect(inputHtmlElement.getAttribute('min')).
      toBe('0');
    expect(inputHtmlElement.getAttribute('max')).
      toBe('100');
    expect(inputHtmlElement.getAttribute('step')).
      toBe('1');
    expect(inputHtmlElement.hasAttribute('readonly')).
      toBe(false);
    expect(inputHtmlElement.getAttribute('type')).
      toBe('number');
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
      'inputMin', 1);
    fixture.componentRef.setInput(
      'inputMax', 10);
    fixture.componentRef.setInput(
      'inputStep', 2);
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
    expect(inputHtmlElement.getAttribute('min')).
      toBe('1');
    expect(inputHtmlElement.getAttribute('max')).
      toBe('10');
    expect(inputHtmlElement.getAttribute('step')).
      toBe('2');
    expect(inputHtmlElement.hasAttribute('readonly')).
      toBe(true);
    expect(inputHtmlElement.getAttribute('type')).
      toBe('number');
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

  test('should emit input - number', () => {
    vi.spyOn(component, '_onChange');

    const inputElement = fixtureDebugElement.
      query(By.css('input'));

    expect(inputElement).toBeTruthy();

    const mockEvent: unknown = {
      target: {
        valueAsNumber: 1,
      }
    }

    inputElement.triggerEventHandler(
      'input', mockEvent);

    expect(component._onChange).
      toHaveBeenCalledWith(1);
  });

  test('should emit input - not a number', () => {
    vi.spyOn(component, '_onChange');

    const inputElement = fixtureDebugElement.
      query(By.css('input'));

    expect(inputElement).toBeTruthy();

    const mockEvent: unknown = {
      target: {
        valueAsNumber: 'One',
      }
    }

    inputElement.triggerEventHandler(
      'input', mockEvent);

    expect(component._onChange).
      toHaveBeenCalledWith(null);
  });
});