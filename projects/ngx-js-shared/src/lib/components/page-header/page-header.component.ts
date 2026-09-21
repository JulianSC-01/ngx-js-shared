import {
  afterNextRender, ChangeDetectionStrategy, Component, effect,
  ElementRef, inject, input, untracked, viewChild
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FocusService } from '../../services/focus.service';

@Component({
  selector: 'app-page-header',
  styleUrl: './page-header.component.css',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
  private readonly focusService =
    inject(FocusService);
  private readonly titleService =
    inject(Title);

  readonly pageTitle =
    input('');

  /* istanbul ignore start */
  readonly header =
    viewChild.required<ElementRef>('header');
  /* istanbul ignore stop */

  constructor() {
    afterNextRender({
      read: () => {
        this.focusService.focusMainHeader();
      }
    });

    effect(() => {
      const header =
        untracked(this.header);
      const headerElement =
        header.nativeElement as HTMLHeadingElement;

      this.titleService.setTitle(
        this.pageTitle() === '' ?
          headerElement.textContent.trim() :
          this.pageTitle());
    });
  }
}