import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  styleUrl: './alert.component.css',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  readonly alertId =
    input<string>();
  readonly alertRole =
    input<string>();
  readonly alertType =
    input('alert-info');

  readonly alertClass =
    computed(() =>
      `alert ${this.alertType()}`);
}