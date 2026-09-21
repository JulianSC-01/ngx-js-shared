import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { AppFormErrorHeaderComponent } from './app-form-error-header.component';

describe('AppFormErrorHeaderComponent', () => {
  let component: AppFormErrorHeaderComponent;
  let fixture: ComponentFixture<AppFormErrorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppFormErrorHeaderComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormErrorHeaderComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});