import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { AppFormInputTextComponent } from './app-form-input-text.component';

describe('AppFormInputTextComponent', () => {
  let component: AppFormInputTextComponent;
  let fixture: ComponentFixture<AppFormInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppFormInputTextComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormInputTextComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });
});