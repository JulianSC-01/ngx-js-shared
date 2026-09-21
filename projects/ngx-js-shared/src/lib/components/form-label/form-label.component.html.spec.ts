import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from "vitest";
import { FormLabelComponent } from './form-label.component';
import { FormLabelHostComponent } from './spec/form-label-host.component';

describe('FormLabelComponent - html', () => {
  let fixture: ComponentFixture<FormLabelHostComponent>;

  let labelDebugElement: DebugElement;
  let labelElement: HTMLLabelElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormLabelComponent,
        FormLabelHostComponent
      ]
    });

    fixture = TestBed.createComponent(FormLabelHostComponent);

    labelDebugElement =
      fixture.debugElement.children[0].query(By.css('label'));
    labelElement =
      labelDebugElement.nativeElement as HTMLLabelElement;

    await fixture.whenStable();
  });

  test('should have content', () => {
    expect(labelElement.textContent.trim()).
      toBe('Label content');
  });

  test('should have required indicator', async () => {
    fixture.componentRef.
      setInput('labelRequired', true);

    await fixture.whenStable();

    const requiredElement = labelDebugElement.
      query(By.css('.label-required'));

    expect(requiredElement).
      toBeTruthy();

    const requiredHtmlElement =
      requiredElement.nativeElement as HTMLElement;

    expect(requiredHtmlElement.className).
      toBe('label-required');
    expect(requiredHtmlElement.textContent.trim()).
      toBe('(required)');
  });

  test('should not have required indicator', () => {
    const requiredElement = labelDebugElement.
      query(By.css('.label-required'));

    expect(requiredElement).
      toBeNull();
  });

  test('should have default classes', () => {
    expect(labelElement.classList.
      contains('form-label')).toBe(true);
    expect(labelElement.classList.
      contains('visually-hidden')).toBe(false);
  });

  test('should have custom classes', async () => {
    fixture.componentRef.
      setInput('labelInvisible', true);

    await fixture.whenStable();

    expect(labelElement.classList.
      contains('form-label')).toBe(true);
    expect(labelElement.classList.
      contains('visually-hidden')).toBe(true);
  });

  test('should not have for attribute', () => {
    expect(labelElement.hasAttribute('for')).
      toBe(false);
  });

  test('should have for attribute', async () => {
    fixture.componentRef.
      setInput('labelControlId', 'input-field');

    await fixture.whenStable();

    expect(labelElement.getAttribute('for')).
      toBe('input-field');
  });
});