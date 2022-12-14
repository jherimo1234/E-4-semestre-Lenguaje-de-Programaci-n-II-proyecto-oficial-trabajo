import {RouterModule, Routes} from "@angular/router";
import { MainPageComponent } from "./core/main-page/main-page.component";
import {NgModule} from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import {HomeComponent} from "./pages/home/home.component";

/*Es un modulo, es como un archivo javascript*/
const routes: Routes = [
  {
    path: 'admin',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: "full"
      },
      {
        path: 'actividades',
        loadChildren: () => import('./pages/actividades/actividades.module')
          .then(m => m.ActividadesModule)
      }
    ],
  },
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
