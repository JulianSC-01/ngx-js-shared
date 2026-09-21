import { Routes } from "@angular/router";
import { AppHomeComponent } from "./components/app-home.component";

export const appRoutes: Routes = [
  { path: '',
    component: AppHomeComponent
  },
  { path: 'components',
    loadChildren: () =>
      import ('./routes/app.component.routes').
        then(m => m.appComponentRoutes)
  },
  { path: 'pipes',
    loadChildren: () =>
      import ('./routes/app.pipe.routes').
        then(m => m.appPipeRoutes)
  },
  { path: 'experimental',
    loadChildren: () =>
      import ('./experimental/routes/app.experimental.routes').
        then(m => m.appExperimentalRoutes)
  }
];