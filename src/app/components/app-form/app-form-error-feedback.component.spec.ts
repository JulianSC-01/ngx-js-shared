import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { AppFormErrorFeedbackComponent } from './app-form-error-feedback.component';

describe('AppFormErrorFeedbackComponent', () => {
  let component: AppFormErrorFeedbackComponent;
  let fixture: ComponentFixture<AppFormErrorFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppFormErrorFeedbackComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormErrorFeedbackComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});