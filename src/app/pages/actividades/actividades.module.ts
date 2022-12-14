import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalleresComponent } from './talleres/talleres.component';
import { ProgramasComponent } from './programas/programas.component';
import { ActividadesComponent } from './actividades.component';
import { ActividadesRoutingModule } from './actividades-routing.module';
import { PersonasComponent } from './personas/personas.component';
import {ProgramaService} from "../../providers/service/programa.service";
import { FormModalComponent } from './programas/form-modal/form-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TallerService} from "../../providers/service/taller.service";
import {PersonaService} from "../../providers/service/persona.service";
import { FormModalPersonasComponent } from './personas/form-modal-personas/form-modal-personas.component';
import {MaterialService} from "../../providers/service/material.service";
import {MaterialesComponent} from "./materiales/materiales.component";
import { FormModalTalleresComponent } from './talleres/form-modal-talleres/form-modal-talleres.component';
import { FormModalMaterialesComponent } from './materiales/form-modal-materiales/form-modal-materiales.component';
import { TipoPersonaComponent } from './tipo-persona/tipo-persona.component';
import { CarrerasComponent } from './carreras/carreras.component';
import { FormModalCarrerasComponent } from './carreras/form-modal-carreras/form-modal-carreras.component';
import { FormModalTipoPersonasComponent } from './tipo-persona/form-modal-tipo-personas/form-modal-tipo-personas.component';
import {TipoPersonaService} from "../../providers/service/tipo-persona.service";
import {CarreraService} from "../../providers/service/carrera.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from '@angular/material/radio';
import { ManageModalTalleresComponent } from './talleres/manage-modal-talleres/manage-modal-talleres.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { FormModalEncuestasComponent } from './encuestas/form-modal-encuestas/form-modal-encuestas.component';

@NgModule({
  declarations: [
    TalleresComponent,
    ProgramasComponent,
    ActividadesComponent,
    PersonasComponent,
    MaterialesComponent,
    TipoPersonaComponent,
    CarrerasComponent,
    FormModalTalleresComponent,
    FormModalMaterialesComponent,
    FormModalCarrerasComponent,
    FormModalTipoPersonasComponent,
    FormModalComponent,
    FormModalPersonasComponent,
    ManageModalTalleresComponent,
    EncuestasComponent,
    FormModalEncuestasComponent,
  ],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule
  ],
    providers: [/*Aca van todos los servicios*/
      CarreraService,
      MaterialService,
      PersonaService,
      ProgramaService,
      TallerService,
      TipoPersonaService
  ]
})
export class ActividadesModule { }
