import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { FocusService } from './focus.service';

describe('FocusService', () => {
  let service: FocusService;

  const mockFocus = vi.fn();

  const mockHTMLElement = {
    focus: mockFocus
  } as unknown as HTMLElement;

  const focusElementNames = [
    'mainNavbarLink', 'mainHeader', 'errorHeader', 'successHeader'
  ];

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({});
    service = TestBed.inject(FocusService);

    vi.spyOn(mockHTMLElement, 'focus');
    vi.spyOn(document, 'querySelector').
      mockReturnValue(mockHTMLElement);

    vi.spyOn(service, 'focusElement');
  });

  afterEach(() => {
    mockFocus.mockClear();

    vi.useRealTimers();
  });

  test('should focus custom element', async () => {
    service.focusElement('#custom');

    await vi.advanceTimersByTimeAsync(100);

    expect(service.focusElement).
      toHaveBeenLastCalledWith('#custom');
    expect(document.querySelector).
      toHaveBeenLastCalledWith('#custom');
    expect(mockHTMLElement.focus).
      toHaveBeenCalledOnce();
  });

  test('should not focus custom element', async () => {
    vi.spyOn(document, 'querySelector').
      mockReturnValue(null);

    service.focusElement('#custom');

    await vi.advanceTimersByTimeAsync(100);

    expect(service.focusElement).
      toHaveBeenLastCalledWith('#custom');
    expect(document.querySelector).
      toHaveBeenLastCalledWith('#custom');
    expect(mockHTMLElement.focus).
      not.toHaveBeenCalled();
  });

  test.for(focusElementNames)(
    'should focus predefined elements',
    async (elementName) => {
      switch (elementName) {
        case 'mainNavbarLink':
          service.focusNavbar();
          break;
        case 'mainHeader':
          service.focusMainHeader();
          break;
        case 'errorHeader':
          service.focusErrorHeader();
          break;
        case 'successHeader':
          service.focusSuccessHeader();
      }

      await vi.advanceTimersByTimeAsync(100);

      expect(service.focusElement).
        toHaveBeenLastCalledWith(`#${elementName}`);
      expect(document.querySelector).
        toHaveBeenLastCalledWith(`#${elementName}`);
      expect(mockHTMLElement.focus).
        toHaveBeenCalledOnce();
    });
});