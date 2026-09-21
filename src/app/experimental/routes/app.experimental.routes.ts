import { Routes } from "@angular/router";
import { AppFormSignalsComponent } from "../components/app-form-signals/app-form-signals.component";

/**
 * @experimental
 */
export const appExperimentalRoutes: Routes = [
  { path: '',
    redirectTo: 'formSignals',
    pathMatch: 'full'
  },
  { path: 'formSignals',
    component: AppFormSignalsComponent
  }
];