import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FocusService {
  focusNavbar() {
    this.focusElement('#mainNavbarLink');
  }

  focusMainHeader() {
    this.focusElement('#mainHeader');
  }

  focusErrorHeader() {
    this.focusElement('#errorHeader');
  }

  focusSuccessHeader() {
    this.focusElement('#successHeader');
  }

  focusElement(elementId: string) {
    setTimeout(() => {
      const element = <HTMLElement>document.
        querySelector(elementId);

      if (element) {
        element.focus();
      }
    }, 100);
  }
}