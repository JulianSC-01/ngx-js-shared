import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FormInputSelectComponent } from './form-input-select.component';
import { FormInputSelectHostComponent } from './spec/form-input-select-host.component';

describe('FormInputSelectComponent - html', () => {
  let component: FormInputSelectComponent;
  let fixture: ComponentFixture<FormInputSelectHostComponent>;

  let fixtureDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormInputSelectComponent,
        FormInputSelectHostComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputSelectHostComponent);
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
    const selectElement = fixtureDebugElement.
      query(By.css('select'));

    expect(selectElement).toBeTruthy();

    const selectHtmlElement =
      selectElement.nativeElement as HTMLSelectElement;

    expect(selectHtmlElement.className).
      toBe('form-select');
    expect(selectHtmlElement.hasAttribute('aria-describedby')).
      toBe(false);
    expect(selectHtmlElement.getAttribute('aria-invalid')).
      toBe('false');
    expect(selectHtmlElement.hasAttribute('disabled')).
      toBe(false);
    expect(selectHtmlElement.hasAttribute('id')).
      toBe(false);
    expect(selectHtmlElement.classList.contains('is-invalid')).
      toBe(false);
    expect(selectHtmlElement.classList.contains('mb-1')).
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

    component.controlDisabled.set(true);
    component.controlIsInvalid.set(true);

    await fixture.whenStable();

    const selectElement = fixtureDebugElement.
      query(By.css('select'));

    expect(selectElement).toBeTruthy();

    const selectHtmlElement =
      selectElement.nativeElement as HTMLSelectElement;

    expect(selectHtmlElement.getAttribute('aria-describedby')).
      toBe('input-error');
    expect(selectHtmlElement.getAttribute('aria-invalid')).
      toBe('true');
    expect(selectHtmlElement.hasAttribute('disabled')).
      toBe(true);
    expect(selectHtmlElement.getAttribute('id')).
      toBe('input-id');
    expect(selectHtmlElement.classList.contains('form-select')).
      toBe(true);
    expect(selectHtmlElement.classList.contains('is-invalid')).
      toBe(true);
    expect(selectHtmlElement.classList.contains('mb-1')).
      toBe(true);
  });

  test('should have options - no empty option', () => {
    const selectElement = fixtureDebugElement.
      query(By.css('select'));
    const selectOptionElements = selectElement.
      queryAll(By.css('option'));

    expect(selectOptionElements).toBeTruthy();
    expect(selectOptionElements.length).toBe(2);

    const optionOneHtmlElement =
      selectOptionElements[0].nativeElement as HTMLOptionElement;
    const optionTwoHtmlElement =
      selectOptionElements[1].nativeElement as HTMLOptionElement;

    expect(optionOneHtmlElement.textContent.trim()).
      toBe('Option 1');
    expect(optionTwoHtmlElement.textContent.trim()).
      toBe('Option 2');
  });

  test('should have options - empty option', async () => {
    fixture.componentRef.setInput(
      'inputEmptyOption', true);

    await fixture.whenStable();

    const selectElement = fixtureDebugElement.
      query(By.css('select'));
    const selectOptionElements = selectElement.
      queryAll(By.css('option'));

    expect(selectOptionElements).toBeTruthy();
    expect(selectOptionElements.length).toBe(3);

    const optionEmptyHtmlElement =
      selectOptionElements[0].nativeElement as HTMLOptionElement;
    const optionOneHtmlElement =
      selectOptionElements[1].nativeElement as HTMLOptionElement;
    const optionTwoHtmlElement =
      selectOptionElements[2].nativeElement as HTMLOptionElement;

    expect(optionEmptyHtmlElement.textContent.trim()).
      toBe('Select');
    expect(optionOneHtmlElement.textContent.trim()).
      toBe('Option 1');
    expect(optionTwoHtmlElement.textContent.trim()).
      toBe('Option 2');
  });

  test('should have no error feedback', () => {
    const feedbackDebugElement = fixtureDebugElement.
      query(By.css('app-form-error-feedback'));

    expect(feedbackDebugElement).toBeNull();
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

    const selectElement = fixtureDebugElement.
      query(By.css('select'));

    expect(selectElement).toBeTruthy();

    selectElement.triggerEventHandler(
      'blur');

    expect(component._onTouched).
      toHaveBeenCalled();
  });

  test('should emit change', () => {
    vi.spyOn(component, '_onChange');

    const selectElement = fixture.debugElement.
      query(By.css('select'));

    expect(selectElement).toBeTruthy();

    const mockEvent: unknown = {
      target: {
        value: '02',
      }
    }

    selectElement.triggerEventHandler(
      'change', mockEvent);

    expect(component._onChange).
      toHaveBeenCalledWith('02');
  });
});