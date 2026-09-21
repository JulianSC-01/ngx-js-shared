import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AlertComponent]
    });

    fixture = TestBed.createComponent(AlertComponent);

    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should have default input', () => {
    expect(component.alertId()).
      toBeUndefined();
    expect(component.alertRole()).
      toBeUndefined();
    expect(component.alertType()).
      toBe('alert-info');
    expect(component.alertClass()).
      toBe('alert alert-info');
  });

  test('should have danger alertType', () => {
    fixture.componentRef.
      setInput('alertType', 'alert-danger');

    expect(component.alertId()).
      toBeUndefined();
    expect(component.alertRole()).
      toBeUndefined();
    expect(component.alertType()).
      toBe('alert-danger');
    expect(component.alertClass()).
      toBe('alert alert-danger');
  });
});