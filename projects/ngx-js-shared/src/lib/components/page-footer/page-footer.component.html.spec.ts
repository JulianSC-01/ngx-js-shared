import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, test } from "vitest";
import { PageFooterComponent } from './page-footer.component';

describe('PageFooterComponent - html', () => {
  let component: PageFooterComponent;
  let fixture: ComponentFixture<PageFooterComponent>;

  let rootDebugElement: DebugElement;
  let divDebugElementOne: DebugElement;
  let divDebugElementTwo: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [PageFooterComponent]
    });

    fixture = TestBed.createComponent(PageFooterComponent);
    component = fixture.componentInstance;

    rootDebugElement = fixture.debugElement.
      query(By.css('footer'));
    divDebugElementOne = rootDebugElement.
      query(By.css('div'));
    divDebugElementTwo = divDebugElementOne.
      query(By.css('div'));

    await fixture.whenStable();
  });

  test('should have default classes', () => {
    const divElementOne =
      divDebugElementOne.nativeElement as HTMLDivElement;
    const divElementTwo =
      divDebugElementTwo.nativeElement as HTMLDivElement;

    expect(divElementOne.className).
      toBe('container');
    expect(divElementTwo.classList.
      contains('row')).toBe(true);
    expect(divElementTwo.classList.
      contains('text-end')).toBe(true);
  });

  test('should have version and build date', async () => {
    fixture.componentRef.setInput(
      'buildDate', '1987-04-05');
    fixture.componentRef.setInput(
      'versionNumber', '1.0.0');

    await fixture.whenStable();

    const dlDebugElement = divDebugElementTwo.
      query(By.css('dl'));
    const dtElement = dlDebugElement.
      query(By.css('dt')).nativeElement as HTMLElement;
    const ddElement = dlDebugElement.
      query(By.css('dd')).nativeElement as HTMLElement;

    expect(dtElement).toBeDefined();
    expect(ddElement).toBeDefined();

    expect(dtElement.textContent.trim()).
      toBe('Version:');
    expect(ddElement.textContent.trim()).
      toBe('1.0.0 (built 1987-04-05)');
  })
});