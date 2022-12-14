import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { ActividadesComponent } from "./actividades.component";
import {MaterialesComponent} from "./materiales/materiales.component";
import { ProgramasComponent } from "./programas/programas.component";
import { TalleresComponent } from "./talleres/talleres.component";
import { PersonasComponent } from "./personas/personas.component";
import {TipoPersonaComponent} from "./tipo-persona/tipo-persona.component";
import {CarrerasComponent} from "./carreras/carreras.component";
import {EncuestasComponent} from "./encuestas/encuestas.component";

/*Es un modulo, es como un archivo javascript*/
const routes: Routes = [
  {
    path: '',
    component: ActividadesComponent,
    children: [
      {
        path: 'materiales',
        component: MaterialesComponent
      },
      {
        path: 'programas',
        component: ProgramasComponent
      },
      {
        path: 'talleres',
        component: TalleresComponent
      },
      {
        path: 'personas',
        component: PersonasComponent
      },
      {
        path: 'tipo-persona',
        component: TipoPersonaComponent
      },
      {
        path: 'carreras',
        component: CarrerasComponent
      },

      {
        path: 'encuestas',
        component: EncuestasComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ActividadesRoutingModule {
}
