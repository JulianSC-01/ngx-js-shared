import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { SpinnerComponent } from "../spinner.component";

@Component({
  imports: [
    SpinnerComponent
  ],
  selector: 'app-spinner-host',
  template: `
    <app-spinner
      [spinnerAccessibleText]="spinnerAccessibleText()"
      [spinnerColor]="spinnerColor()"
      [spinnerSmall]="spinnerSmall()"
      [spinnerStyle]="spinnerStyle()">
      <span id="spinnerLabel">
        Loading...
      </span>
    </app-spinner>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerHostComponent {
  protected readonly spinnerAccessibleText =
    input<string>('Loading...');
  protected readonly spinnerColor =
    input('');
  protected readonly spinnerSmall =
    input(false);
  protected readonly spinnerStyle =
    input('spinner-border');
}