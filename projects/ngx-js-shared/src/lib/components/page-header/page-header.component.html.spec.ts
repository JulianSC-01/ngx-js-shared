import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from "vitest";
import { PageHeaderComponent } from './page-header.component';
import { PageHeaderHostComponent } from './spec/page-header-host.component';

describe('PageHeaderComponent - html', () => {
  let fixture: ComponentFixture<PageHeaderHostComponent>;

  let headerDebugElement: DebugElement;
  let headerElement: HTMLHeadingElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PageHeaderComponent,
        PageHeaderHostComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHeaderHostComponent);

    headerDebugElement =
      fixture.debugElement.children[0].query(By.css('h1'));
    headerElement =
      headerDebugElement.nativeElement as HTMLHeadingElement;

    await fixture.whenStable();
  });

  test('should have attributes', () => {
    expect(headerElement.getAttribute('id')).
      toBe('mainHeader');
    expect(headerElement.getAttribute('tabindex')).
      toBe('-1');
  });

  test('should have header text', () => {
    expect(headerElement.textContent.trim()).
      toBe('Page header');
  });
});