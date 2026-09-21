import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, test } from "vitest";
import { AppAlertComponent } from './app-alert.component';

describe('AppAlertComponent', () => {
  let component: AppAlertComponent;
  let fixture: ComponentFixture<AppAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppAlertComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAlertComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});