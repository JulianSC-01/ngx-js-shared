import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from "vitest";
import { FormErrorFeedbackComponent } from './form-error-feedback.component';

describe('FormErrorFeedbackComponent - html', () => {
  let component: FormErrorFeedbackComponent;
  let fixture: ComponentFixture<FormErrorFeedbackComponent>;

  let formControl: FormControl<string>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormErrorFeedbackComponent
      ]
    });

    fixture = TestBed.createComponent(FormErrorFeedbackComponent);
    component = fixture.componentInstance;

    formControl =
      new FormControl('', {
          nonNullable: true,
          validators: Validators.required
        }
      );

    fixture.componentRef.
      setInput('errorFeedbackControl', formControl);

    await fixture.whenStable();
  });

  test('should have no div', () => {
    const rootElement = fixture.debugElement.
      query(By.css('div'));

    expect(rootElement).toBeNull();
  });

  test('should have div', async () => {
    fixture.componentRef.
      setInput('errorFeedbackMessages', {
        'required': 'Field is required'
      });

    formControl.markAsDirty();

    await fixture.whenStable();

    const rootElement = fixture.debugElement.
      query(By.css('div'));

    expect(rootElement).
      toBeTruthy();
    expect(rootElement.nativeElement.className).
      toBe('text-danger');
    expect(rootElement.nativeElement.hasAttribute('id')).
      toBe(false);

    const errorElements = rootElement.
      queryAll(By.css('small'));

    expect(errorElements.length).
      toBe(1);
    expect(errorElements[0].nativeElement.className).
      toBe('d-block');
    expect(errorElements[0].nativeElement.textContent.trim()).
      toBe('Field is required');
  });

  test('should have div - with id', async () => {
    fixture.componentRef.
      setInput('errorFeedbackId', 'ctl-error');
    fixture.componentRef.
      setInput('errorFeedbackMessages', {
        'required': 'Field is required'
      });

    formControl.markAsDirty();

    await fixture.whenStable();

    const rootElement = fixture.debugElement.
      query(By.css('div'));

    expect(rootElement).
      toBeTruthy();
    expect(rootElement.nativeElement.className).
      toBe('text-danger');
    expect(rootElement.nativeElement.getAttribute('id')).
      toBe('ctl-error');

    const errorElements = rootElement.
      queryAll(By.css('small'));

    expect(errorElements.length).
      toBe(1);
    expect(errorElements[0].nativeElement.className).
      toBe('d-block');
    expect(errorElements[0].nativeElement.textContent.trim()).
      toBe('Field is required');
  });
});