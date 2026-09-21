import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { AppFormInputNumberComponent } from './app-form-input-number.component';

describe('AppFormInputNumberComponent', () => {
  let component: AppFormInputNumberComponent;
  let fixture: ComponentFixture<AppFormInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppFormInputNumberComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormInputNumberComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});