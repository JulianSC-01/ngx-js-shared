import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-form-label',
  styleUrl: './form-label.component.css',
  templateUrl: './form-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLabelComponent {
  readonly labelControlId =
    input<string>();
  readonly labelInvisible =
    input(false, {
      transform: booleanAttribute
    });
  readonly labelRequired =
    input(false, {
      transform: booleanAttribute
    });
}