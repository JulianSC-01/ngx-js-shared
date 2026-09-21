import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FocusService } from '../../services/focus.service';
import { FormErrorHeaderComponent } from './form-error-header.component';

interface TestForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
}

describe('FormErrorHeaderComponent', () => {
  let component: FormErrorHeaderComponent;
  let fixture: ComponentFixture<FormErrorHeaderComponent>;

  let focusService: FocusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormErrorHeaderComponent
      ]
    })
    .compileComponents();

    focusService = TestBed.inject(FocusService);

    fixture = TestBed.createComponent(FormErrorHeaderComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should clear errors', () => {
    component.errorCountMessage.set('Error');

    component.clearErrors();

    expect(component.errorCountMessage()).
      toBe('');
  });

  test('should not count errors', () => {
    vi.spyOn(focusService, 'focusErrorHeader');

    component.errorCountMessage.set('Error');

    component.countErrors();

    expect(component.errorCountMessage()).
      toBe('Error');
    expect(focusService.focusErrorHeader).
      not.toHaveBeenCalled();
  });

  describe('should count errors', () => {
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

      vi.spyOn(focusService, 'focusErrorHeader');

      fixture.componentRef.setInput(
        'errorFormGroup', form);
    });

    test('should count 0 errors', () => {
      form.controls.firstName.setValue('Julian');
      form.controls.lastName.setValue('Salati');

      component.countErrors();

      expect(component.errorCountMessage()).
        toBe('');
      expect(focusService.focusErrorHeader).
        not.toHaveBeenCalled();
    })

    test('should count 1 error', () => {
      form.controls.firstName.setValue('Julian');

      component.countErrors();

      expect(component.errorCountMessage()).
        toBe('Please correct the error on this page.');
      expect(focusService.focusErrorHeader).
        toHaveBeenCalledOnce();
    });

    test('should count 2 errors', () => {
      component.countErrors();

      expect(component.errorCountMessage()).
        toBe('Please correct the 2 errors on this page.');
      expect(focusService.focusErrorHeader).
        toHaveBeenCalledOnce();
    });
  });
});