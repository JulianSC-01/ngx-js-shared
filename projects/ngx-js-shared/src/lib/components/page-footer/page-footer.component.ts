import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  styleUrl: './page-footer.component.css',
  templateUrl: './page-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageFooterComponent {
  readonly buildDate =
    input('', {
      transform: (value: string | Date) =>
        value instanceof Date ?
          value.toLocaleDateString('en-CA') : value
    });
  readonly versionNumber =
    input<string | number>('');
}