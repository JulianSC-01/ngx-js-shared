import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const SPINNER_BORDER = 'spinner-border';
const SPINNER_BORDER_SM = 'spinner-border-sm';

const SPINNER_GROW = 'spinner-grow';
const SPINNER_GROW_SM = 'spinner-grow-sm';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  readonly spinnerAccessibleText =
    input('Loading...');
  readonly spinnerColor =
    input('');
  readonly spinnerSmall =
    input(false, {
      transform: booleanAttribute
    });
  readonly spinnerStyle =
    input(SPINNER_BORDER);

  readonly spinnerSize =
    computed(() => {
      if (this.spinnerSmall()) {
        switch (this.spinnerStyle()) {
          case SPINNER_GROW:
            return SPINNER_GROW_SM;
          case SPINNER_BORDER:
          default:
            return SPINNER_BORDER_SM;
        }
      }

      return '';
   });

  readonly spinnerClass =
    computed(() => {
      let spinnerClass =
        this.spinnerStyle();

      if (this.spinnerSize()) {
        spinnerClass =
          `${spinnerClass} ${this.spinnerSize()}`;
      }

      if (this.spinnerColor()) {
        spinnerClass =
          `${spinnerClass} ${this.spinnerColor()}`;
      }

      return spinnerClass
    });
}