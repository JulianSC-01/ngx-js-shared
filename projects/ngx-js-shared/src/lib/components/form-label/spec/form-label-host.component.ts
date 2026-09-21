import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { FormLabelComponent } from "../form-label.component";

@Component({
  imports: [
    FormLabelComponent
  ],
  selector: 'app-form-label-host',
  template: `
    <app-form-label
      [labelControlId]="labelControlId()"
      [labelInvisible]="labelInvisible()"
      [labelRequired]="labelRequired()">
      Label content
    </app-form-label>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLabelHostComponent {
  protected readonly labelControlId =
    input<string>();
  protected readonly labelInvisible =
    input<boolean | undefined>(undefined);
  protected readonly labelRequired =
    input<boolean | undefined>(undefined);
}