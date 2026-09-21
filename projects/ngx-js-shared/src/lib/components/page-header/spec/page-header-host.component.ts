import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { PageHeaderComponent } from "../page-header.component";

@Component({
  imports: [
    PageHeaderComponent
  ],
  selector: 'app-page-header-host',
  template: `
    <app-page-header
      [pageTitle]="pageTitle()">
      Page header
    </app-page-header>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderHostComponent {
  protected readonly pageTitle =
    input('');
}