import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormA11yDirective } from "../form-a11y.directive";

@Component({
  imports: [
    FormA11yDirective
  ],
  selector: 'app-form-a11y-template-host',
  template: `
    <form
      appFormA11y
      autocomplete="off">
    </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormA11yNoneHostComponent {
}