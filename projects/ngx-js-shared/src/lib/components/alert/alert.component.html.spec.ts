import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from "vitest";
import { AlertComponent } from './alert.component';

describe('AlertComponent - html', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  let rootElement: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AlertComponent]
    });

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;

    rootElement = fixture.debugElement.
      query(By.css('div')).nativeElement;

    await fixture.whenStable();
  });

  test('should have default class', () => {
    expect(rootElement.classList.
      contains('alert')).toBe(true);
    expect(rootElement.classList.
      contains('alert-info')).toBe(true);
  });

  test('should have danger class', async () => {
    fixture.componentRef.
      setInput('alertType', 'alert-danger');

    await fixture.whenStable();

    expect(rootElement.classList.
      contains('alert')).toBe(true);
    expect(rootElement.classList.
      contains('alert-danger')).toBe(true);
  });

  test('should have default attributes', () => {
    expect(rootElement.hasAttribute('id')).
      toBe(false);
    expect(rootElement.hasAttribute('role')).
      toBe(false);
    expect(rootElement.hasAttribute('tabindex')).
      toBe(false);
  });

  test('should have custom attributes', async () => {
    fixture.componentRef.
      setInput('alertId', 'alert-id');
    fixture.componentRef.
      setInput('alertRole', 'note');

    await fixture.whenStable();

    expect(rootElement.getAttribute('id')).
      toBe('alert-id');
    expect(rootElement.getAttribute('role')).
      toBe('note');
    expect(rootElement.getAttribute('tabindex')).
      toBe('-1');
  });
});