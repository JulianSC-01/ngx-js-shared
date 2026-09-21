import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { AlertComponent } from 'ngx-js-shared';

@Component({
  imports: [
    AlertComponent
  ],
  selector: 'app-form-signal-error-header',
  templateUrl: './form-signal-error-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSignalErrorHeaderComponent<T> {
  readonly errorFormRoot =
    input.required<FieldTree<T>>();
  readonly errorMessage =
    input<string>();

  private readonly formErrorCount =
    computed(() => {
      let errorCount = 0;

      this.errorFormRoot()().
        errorSummary().forEach(error => {
          if (error.fieldTree().touched()) {
            errorCount++;
          }
      });

      return errorCount;
    });

  protected readonly formErrorCountMessage =
    computed(() => {
      if (this.formErrorCount() === 1) {
        return 'Please correct the error on this page.';
      } else if (this.formErrorCount() > 1) {
        return `Please correct the ${this.formErrorCount()} errors on this page.`;
      } else {
        return '';
      }
    });

  protected readonly formInvalid =
    computed(() => this.formErrorCount() > 0);
}