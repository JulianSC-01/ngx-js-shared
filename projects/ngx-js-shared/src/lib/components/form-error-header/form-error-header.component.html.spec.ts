import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from "vitest";
import { FormErrorHeaderComponent } from './form-error-header.component';

interface TestForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
}

describe('FormErrorHeaderComponent - html', () => {
  let component: FormErrorHeaderComponent;
  let fixture: ComponentFixture<FormErrorHeaderComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormErrorHeaderComponent
      ]
    });

    fixture = TestBed.createComponent(FormErrorHeaderComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should have no div', () => {
    const alertElement = fixture.debugElement.
      query(By.css('app-alert'));

    expect(alertElement).toBeNull();
  });

  test('should have error header - message', async () => {
    fixture.componentRef.
      setInput('errorMessage', 'Error');

    await fixture.whenStable();

    const alertElements = fixture.debugElement.
      queryAll(By.css('app-alert'));

    expect(alertElements).
      toBeTruthy();
    expect(alertElements.length).
      toBe(1);

    const alertElement =
      alertElements[0].nativeElement as HTMLElement;

    expect(alertElement.getAttribute('alertid')).
      toBe('errorHeader');
    expect(alertElement.getAttribute('alertrole')).
      toBe('note');
    expect(alertElement.getAttribute('alerttype')).
      toBe('alert-danger');
    expect(alertElement.textContent.trim()).
      toBe('Error');
  });

  describe('should have error header - form', () => {
    let form: FormGroup<TestForm>;

    beforeEach(() => {
      const formBuilder =
        TestBed.inject(NonNullableFormBuilder);

      form = formBuilder.group<TestForm>({
        firstName: formBuilder.control('',
          Validators.required),
        lastName: formBuilder.control('',
          Validators.required),
      });

      form.markAllAsDirty();

      fixture.componentRef.setInput(
        'errorFormGroup', form);
    });

    test('should count 0 errors', async () => {
      form.controls.firstName.setValue('Julian');
      form.controls.lastName.setValue('Salati');

      component.countErrors();

      await fixture.whenStable();

      const alertElement = fixture.debugElement.
        query(By.css('app-alert'));

      expect(alertElement).toBeNull();
    });

    test('should count 1 error', async () => {
      form.controls.firstName.setValue('Julian');

      component.countErrors();

      await fixture.whenStable();

      const alertElements = fixture.debugElement.
        queryAll(By.css('app-alert'));

      expect(alertElements).
        toBeTruthy();
      expect(alertElements.length).
        toBe(1);

      const alertElement =
        alertElements[0].nativeElement as HTMLElement;

      expect(alertElement.getAttribute('alertid')).
        toBe('errorHeader');
      expect(alertElement.getAttribute('alertrole')).
        toBe('note');
      expect(alertElement.getAttribute('alerttype')).
        toBe('alert-danger');
      expect(alertElement.textContent.trim()).
        toBe('Please correct the error on this page.');
    });

    test('should count 2 errors', async () => {
      component.countErrors();

      await fixture.whenStable();

      const alertElements = fixture.debugElement.
        queryAll(By.css('app-alert'));

      expect(alertElements).
        toBeTruthy();
      expect(alertElements.length).
        toBe(1);

      const alertElement =
        alertElements[0].nativeElement as HTMLElement;

      expect(alertElement.getAttribute('alertid')).
        toBe('errorHeader');
      expect(alertElement.getAttribute('alertrole')).
        toBe('note');
      expect(alertElement.getAttribute('alerttype')).
        toBe('alert-danger');
      expect(alertElement.textContent.trim()).
        toBe('Please correct the 2 errors on this page.');
    });
  });
});