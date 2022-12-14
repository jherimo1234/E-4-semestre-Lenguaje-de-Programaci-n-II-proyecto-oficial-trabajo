import { Component, OnInit } from '@angular/core';
import {TallerService} from "../../providers/service/taller.service";
import Swal from "sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalTalleresComponent} from "./modal-talleres/modal-talleres.component";
import {ModalEstudiantesTalleresComponent} from "./modal-estudiantes-talleres/modal-estudiantes-talleres.component";
import {ModalEncuestasTalleresComponent} from "./modal-encuestas-talleres/modal-encuestas-talleres.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  talleres: any = [];
  constructor(private tallerService: TallerService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTalleres();
  }
  getTalleres(): void{
    this.tallerService.getAll$().subscribe(response => {
      /*console.log(response);/*aca se guarda toda la info del backend*/
      this.talleres = response.data || []; /*|| es OR*/
      console.log(this.talleres);
    });
  }

  openModalCiudadanos(item: any): any {
    const modal = this.modalService.open(ModalTalleresComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tallId = item.tallId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Informacion';
  }

  openModalEstudiantes(item: any): any {
    const modal = this.modalService.open(ModalEstudiantesTalleresComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tallId = item.tallId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Informacion';

  }

  openModalEncuestas(item: any): any {
    const modal = this.modalService.open(ModalEncuestasTalleresComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tallId = item.tallId;
    modal.componentInstance.tallTema = item.tallTema;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Encuestas';

  }
}
