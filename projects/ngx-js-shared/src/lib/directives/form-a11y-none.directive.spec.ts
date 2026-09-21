import { ComponentFixture, TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FormA11yDirective } from "./form-a11y.directive";
import { FormA11yNoneHostComponent } from "./spec/form-a11y-none.component";

describe('FormA11yNoneDirective', () => {
  let component: FormA11yNoneHostComponent;
  let fixture: ComponentFixture<FormA11yNoneHostComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        FormA11yDirective,
        FormA11yNoneHostComponent
      ]
    });

    vi.spyOn(console, 'warn');

    fixture = TestBed.createComponent(FormA11yNoneHostComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();

    expect(console.warn).
      toHaveBeenCalledExactlyOnceWith(
        'appFormA11y -> No host form found');
  });
});