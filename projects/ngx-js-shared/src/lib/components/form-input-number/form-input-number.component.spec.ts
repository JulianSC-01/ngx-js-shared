import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FormInputNumberComponent } from './form-input-number.component';
import { FormInputNumberHostComponent } from './spec/form-input-number-host.component';

describe('FormInputNumberComponent', () => {
  let component: FormInputNumberComponent;
  let fixture: ComponentFixture<FormInputNumberHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormInputNumberComponent,
        FormInputNumberHostComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputNumberHostComponent);
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
    component.formControl().setValue(0);
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
    component.writeValue(5);

    expect(component.input().nativeElement.value).
      toBe('5');
  });

  test('should have changed - number', () => {
    vi.spyOn(component, '_onChange');

    const mockEvent: unknown = {
      target: {
        valueAsNumber: 1,
      }
    }

    component.controlHasChanged(
      mockEvent as Event);

    expect(component._onChange).
      toHaveBeenCalledWith(1);
  });

  test('should have changed - not a number', () => {
    vi.spyOn(component, '_onChange');

    const mockEvent: unknown = {
      target: {
        valueAsNumber: 'One',
      }
    }

    component.controlHasChanged(
      mockEvent as Event);

    expect(component._onChange).
      toHaveBeenCalledWith(null);
  });
});