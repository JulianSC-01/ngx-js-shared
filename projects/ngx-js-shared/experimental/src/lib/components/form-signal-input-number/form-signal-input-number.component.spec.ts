import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormField } from '@angular/forms/signals';
import { beforeEach, describe, expect, test } from "vitest";
import { FormSignalInputNumberComponent } from './form-signal-input-number.component';

describe('FormSignalInputNumberComponent', () => {
  let component: FormSignalInputNumberComponent;
  let fixture: ComponentFixture<FormSignalInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormSignalInputNumberComponent
      ]
    })
    .overrideComponent(
      FormSignalInputNumberComponent, {
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
      FormSignalInputNumberComponent);

    component = fixture.componentInstance;

    fixture.componentRef.
      setInput('inputShowErrors', false);

    await fixture.whenStable();
  });

  test('should create', async () => {
    expect(component).toBeDefined();
  });
});
