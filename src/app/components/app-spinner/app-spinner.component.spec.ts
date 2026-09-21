import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, test } from "vitest";
import { AppSpinnerComponent } from './app-spinner.component';

describe('AppSpinnerComponent', () => {
  let component: AppSpinnerComponent;
  let fixture: ComponentFixture<AppSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppSpinnerComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSpinnerComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});