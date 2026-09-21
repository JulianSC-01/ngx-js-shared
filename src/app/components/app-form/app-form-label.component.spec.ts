import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { AppFormLabelComponent } from './app-form-label.component';

describe('AppFormLabelComponent', () => {
  let component: AppFormLabelComponent;
  let fixture: ComponentFixture<AppFormLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppFormLabelComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormLabelComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});