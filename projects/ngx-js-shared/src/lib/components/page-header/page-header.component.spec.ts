import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FocusService } from '../../services/focus.service';
import { PageHeaderComponent } from './page-header.component';
import { PageHeaderHostComponent } from './spec/page-header-host.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderHostComponent>;

  let focusService: FocusService;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PageHeaderComponent,
        PageHeaderHostComponent
      ]
    })
    .compileComponents();

    focusService = TestBed.inject(FocusService);
    titleService = TestBed.inject(Title);

    vi.spyOn(focusService, 'focusMainHeader');
    vi.spyOn(titleService, 'setTitle');

    fixture = TestBed.createComponent(PageHeaderHostComponent);
    component = fixture.debugElement.children[0].componentInstance;

    await fixture.whenStable();
  });

  test('should create', () => {
    expect(component).toBeDefined();
  });

  test('should focus header', () => {
    expect(focusService.focusMainHeader).
      toHaveBeenCalledOnce();
  });

  test('should set default title', () => {
    expect(titleService.setTitle).
      toHaveBeenLastCalledWith('Page header');
  });

  test('should set custom title', async () => {
    fixture.componentRef.setInput(
      'pageTitle', 'Custom header');

    await fixture.whenStable();

    expect(titleService.setTitle).
      toHaveBeenLastCalledWith('Custom header');
  });
});