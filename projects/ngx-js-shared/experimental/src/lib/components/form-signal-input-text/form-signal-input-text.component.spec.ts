import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormField } from '@angular/forms/signals';
import { beforeEach, describe, expect, test } from "vitest";
import { FormSignalInputTextComponent } from './form-signal-input-text.component';

describe('FormSignalInputTextComponent', () => {
  let component: FormSignalInputTextComponent;
  let fixture: ComponentFixture<FormSignalInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormSignalInputTextComponent
      ]
    })
    .overrideComponent(
      FormSignalInputTextComponent, {
        add: {
          providers: [
            {
              provide: FormField,
              useValue: {}
            }
          ]
        }
    }).compileComponents();

    fixture = TestBed.createComponent(
      FormSignalInputTextComponent);

    component = fixture.componentInstance;

    fixture.componentRef.
      setInput('inputShowErrors', false);

    await fixture.whenStable();
  });

  test('should create', async () => {
    expect(component).toBeDefined();
  });
});
