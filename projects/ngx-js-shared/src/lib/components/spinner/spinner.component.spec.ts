import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SpinnerComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should have default input', () => {
    expect(component.spinnerAccessibleText()).
      toBe('Loading...');
    expect(component.spinnerColor()).
      toBe('');
    expect(component.spinnerSmall()).
      toBe(false);
    expect(component.spinnerStyle()).
      toBe('spinner-border');
    expect(component.spinnerSize()).
      toBe('');
    expect(component.spinnerClass()).
      toBe(component.spinnerStyle());
  });

  test('should have grow spinner', async () => {
    fixture.componentRef.setInput(
      'spinnerStyle', 'spinner-grow');

    await fixture.whenStable();

    expect(component.spinnerStyle()).
      toBe('spinner-grow');
    expect(component.spinnerClass()).
      toBe(component.spinnerStyle());
  });

  test('should have red border spinner', async () => {
    fixture.componentRef.setInput(
      'spinnerColor', 'text-danger');

    await fixture.whenStable();

    expect(component.spinnerColor()).
      toBe('text-danger');
    expect(component.spinnerStyle()).
      toBe('spinner-border');
    expect(component.spinnerClass()).
      toBe(
        component.spinnerStyle() + ' ' +
        component.spinnerColor());
  });

  test('should have red grow spinner', async () => {
    fixture.componentRef.setInput(
      'spinnerColor', 'text-danger');
    fixture.componentRef.setInput(
      'spinnerStyle', 'spinner-grow');

    await fixture.whenStable();

    expect(component.spinnerColor()).
      toBe('text-danger');
    expect(component.spinnerStyle()).
      toBe('spinner-grow');
    expect(component.spinnerClass()).
      toBe(
        component.spinnerStyle() + ' ' +
        component.spinnerColor());
  });

  test('should have small border spinner', async () => {
    fixture.componentRef.setInput(
      'spinnerSmall', true);

    await fixture.whenStable();

    expect(component.spinnerSmall()).
      toBe(true);
    expect(component.spinnerStyle()).
      toBe('spinner-border');
    expect(component.spinnerSize()).
      toBe('spinner-border-sm');
    expect(component.spinnerClass()).
      toBe(
        component.spinnerStyle() + ' ' +
        component.spinnerSize());
  });

  test('should have small grow spinner', async () => {
    fixture.componentRef.setInput(
      'spinnerSmall', true);
    fixture.componentRef.setInput(
      'spinnerStyle', 'spinner-grow');

    await fixture.whenStable();

    expect(component.spinnerSmall()).
      toBe(true);
    expect(component.spinnerStyle()).
      toBe('spinner-grow');
    expect(component.spinnerSize()).
      toBe('spinner-grow-sm');
    expect(component.spinnerClass()).
      toBe(
        component.spinnerStyle() + ' ' +
        component.spinnerSize());
  });

  test('should have small red border spinner', async () => {
    fixture.componentRef.setInput(
      'spinnerColor', 'text-danger');
    fixture.componentRef.setInput(
      'spinnerSmall', true);

    await fixture.whenStable();

    expect(component.spinnerColor()).
      toBe('text-danger');
    expect(component.spinnerSmall()).
      toBe(true);
    expect(component.spinnerStyle()).
      toBe('spinner-border');
    expect(component.spinnerSize()).
      toBe('spinner-border-sm');
    expect(component.spinnerClass()).
      toBe(
        component.spinnerStyle() + ' ' +
        component.spinnerSize()  + ' ' +
        component.spinnerColor());
  });

  test('should have small red grow spinner', async () => {
    fixture.componentRef.setInput(
      'spinnerColor', 'text-danger');
    fixture.componentRef.setInput(
      'spinnerSmall', true);
    fixture.componentRef.setInput(
      'spinnerStyle', 'spinner-grow');

    await fixture.whenStable();

    expect(component.spinnerColor()).
      toBe('text-danger');
    expect(component.spinnerSmall()).
      toBe(true);
    expect(component.spinnerStyle()).
      toBe('spinner-grow');
    expect(component.spinnerSize()).
      toBe('spinner-grow-sm');
    expect(component.spinnerClass()).
      toBe(
        component.spinnerStyle() + ' ' +
        component.spinnerSize()  + ' ' +
        component.spinnerColor());
  });
});