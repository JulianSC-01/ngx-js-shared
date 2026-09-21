import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormField } from '@angular/forms/signals';
import { beforeEach, describe, expect, test } from "vitest";
import { FormSignalInputSelectComponent } from './form-signal-input-select.component';

describe('FormSignalInputSelectComponent', () => {
  let component: FormSignalInputSelectComponent;
  let fixture: ComponentFixture<FormSignalInputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormSignalInputSelectComponent
      ]
    })
    .overrideComponent(
      FormSignalInputSelectComponent, {
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
      FormSignalInputSelectComponent);

    component = fixture.componentInstance;

    fixture.componentRef.
      setInput('inputShowErrors', false);

    await fixture.whenStable();
  });

  test('should create', async () => {
    expect(component).toBeDefined();
  });
});
