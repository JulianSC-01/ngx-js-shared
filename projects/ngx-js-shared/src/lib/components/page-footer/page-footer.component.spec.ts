import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test } from "vitest";
import { PageFooterComponent } from './page-footer.component';

describe('PageFooterComponent', () => {
  let component: PageFooterComponent;
  let fixture: ComponentFixture<PageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PageFooterComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFooterComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should transform buildDate from string', () => {
    fixture.componentRef.setInput(
      'buildDate', '1987-04-05');

    expect(component.buildDate()).toBe(
      '1987-04-05');
  });

  test('should transform buildDate from Date', () => {
    fixture.componentRef.setInput(
      'buildDate', new Date(1987, 3, 5));

    expect(component.buildDate()).toBe(
      '1987-04-05');
  });
});