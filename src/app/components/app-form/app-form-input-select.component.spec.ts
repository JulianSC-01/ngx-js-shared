import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { AppFormInputSelectComponent } from './app-form-input-select.component';

describe('AppFormInputSelectComponent', () => {
  let component: AppFormInputSelectComponent;
  let fixture: ComponentFixture<AppFormInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppFormInputSelectComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormInputSelectComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});