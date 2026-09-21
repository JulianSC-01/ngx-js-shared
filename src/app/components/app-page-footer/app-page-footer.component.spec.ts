import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, test } from "vitest";
import { AppPageFooterComponent } from './app-page-footer.component';

describe('AppPageFooterComponent', () => {
  let component: AppPageFooterComponent;
  let fixture: ComponentFixture<AppPageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppPageFooterComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPageFooterComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});