import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from "vitest";
import { SpinnerHostComponent } from './spec/spinner-host.component';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerHostComponent - html', () => {
  let fixture: ComponentFixture<SpinnerHostComponent>;

  let spinnerDebugElement: DebugElement;
  let spinnerElement: HTMLDivElement;

  let spinnerAccessibleDebugElement: DebugElement;
  let spinnerAccessibleElement: HTMLSpanElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        SpinnerComponent,
        SpinnerHostComponent
      ]
    });

    fixture = TestBed.createComponent(SpinnerHostComponent);

    spinnerDebugElement =
      fixture.debugElement.children[0].
        query(By.css('div'));
    spinnerElement =
      spinnerDebugElement.nativeElement as HTMLDivElement;

    await fixture.whenStable();

    spinnerAccessibleDebugElement =
      spinnerDebugElement.query(By.css('span'));
    spinnerAccessibleElement =
      spinnerAccessibleDebugElement.nativeElement as HTMLSpanElement;
  });

  test('should have default input', () => {
    expect(spinnerElement.className).
      toBe('spinner-border');
    expect(spinnerElement.getAttribute('role')).
      toBe('status');
    expect(spinnerAccessibleElement).
      toBeTruthy();
    expect(spinnerAccessibleElement.className).
      toBe('visually-hidden');
    expect(spinnerAccessibleElement.textContent.trim()).
      toBe('Loading...');
  });

  test('should have custom input', async () => {
    fixture.componentRef.setInput(
      'spinnerAccessibleText', 'Please wait...');
    fixture.componentRef.setInput(
      'spinnerColor', 'text-danger');
    fixture.componentRef.setInput(
      'spinnerSmall', true);
    fixture.componentRef.setInput(
      'spinnerStyle', 'spinner-grow');

    await fixture.whenStable();

    expect(spinnerElement.className).
      toBe('spinner-grow spinner-grow-sm text-danger');
    expect(spinnerElement.getAttribute('role')).
      toBe('status');
    expect(spinnerAccessibleElement).
      toBeTruthy();
    expect(spinnerAccessibleElement.className).
      toBe('visually-hidden');
    expect(spinnerAccessibleElement.textContent.trim()).
      toBe('Please wait...');
  });

  test('should have no accessible input', async () => {
    fixture.componentRef.setInput(
      'spinnerAccessibleText', '');

    await fixture.whenStable();

    const spinnerAccessibleDebugElement =
      spinnerDebugElement.query(By.css('span'));

    expect(spinnerAccessibleDebugElement).
      toBeFalsy();
  });

  test('should have content', () => {
    const labelContentElement =
      fixture.debugElement.children[0].
        query(By.css('#spinnerLabel'));

    expect(labelContentElement).
      toBeTruthy();

    const labelContentHtmlElement =
      labelContentElement.nativeElement as HTMLSpanElement;

    expect(labelContentHtmlElement).
      toBeTruthy();
    expect(labelContentHtmlElement.textContent.trim()).
      toBe('Loading...');
  });
});