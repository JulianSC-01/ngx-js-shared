import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FormInputSelectComponent } from './form-input-select.component';
import { FormInputSelectHostComponent } from './spec/form-input-select-host.component';

describe('FormInputSelectComponent', () => {
  let component: FormInputSelectComponent;
  let fixture: ComponentFixture<FormInputSelectHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormInputSelectComponent,
        FormInputSelectHostComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputSelectHostComponent);
    component = fixture.debugElement.children[0].componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should have form control', () => {
    expect(component.formControl()).
      toBe(fixture.componentInstance.control);
  });

  test('should register on change', () => {
    const onChange = vi.fn();

    component.registerOnChange(onChange);

    expect(component._onChange).
      toBe(onChange);
  });

  test('should register on touched', () => {
    const onTouched = vi.fn();

    component.registerOnTouched(onTouched);

    expect(component._onTouched).
      toBe(onTouched);
  });

  test('should have error', async () => {
    component.formControl().setValue('');
    component.formControl().markAsDirty();

    await fixture.whenStable();

    expect(component.controlIsInvalid()).
      toBe(true);
  });

  test('should have no error', async () => {
    component.formControl().markAsDirty();

    await fixture.whenStable();

    expect(component.controlIsInvalid()).
      toBe(false);
  });

  test('should be enabled', () => {
    component.setDisabledState(false);

    expect(component.controlDisabled()).
      toBe(false);
  });

  test('should be disabled', () => {
    component.setDisabledState(true);

    expect(component.controlDisabled()).
      toBe(true);
  });

  test('should write value', () => {
    component.writeValue('02');

    expect(component.input().nativeElement.value).
      toBe('02');
  });

  test('should have changed', () => {
    vi.spyOn(component, '_onChange');

    const mockEvent: unknown = {
      target: {
        value: 'Test',
      }
    }

    component.controlHasChanged(
      mockEvent as Event);

    expect(component._onChange).
      toHaveBeenCalledWith('Test');
  });
});