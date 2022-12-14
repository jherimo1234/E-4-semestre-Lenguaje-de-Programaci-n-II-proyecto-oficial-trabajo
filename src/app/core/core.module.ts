import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './main-page/header/header.component';
import { FooterComponent } from './main-page/footer/footer.component';
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidebarComponent } from './main-page/sidebar/sidebar.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";

/*En este modulo ira todo el diseño de esta página*/
@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,/*importamos el encabezado de la pagina */
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatSidenavModule,
        MatExpansionModule,
        MatButtonModule,
        /*aca tambien importamos*/
    ]
})
export class CoreModule { }
