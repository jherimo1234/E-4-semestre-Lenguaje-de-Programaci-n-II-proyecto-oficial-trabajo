import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TipoPersonaService} from "../../../providers/service/tipo-persona.service";
import Swal from "sweetalert2";
import {FormModalTipoPersonasComponent} from "./form-modal-tipo-personas/form-modal-tipo-personas.component";

@Component({
  selector: 'app-tipo-persona',
  templateUrl: './tipo-persona.component.html',
  styleUrls: ['./tipo-persona.component.css']
})
export class TipoPersonaComponent implements OnInit {

  tipoPersonas: any = [];

  constructor(private tipoPersonaService: TipoPersonaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTipoPersonas();
  }

  getTipoPersonas(): void{
    this.tipoPersonaService.getAll$().subscribe(response => {
      this.tipoPersonas = response.data || []; /*|| es OR*/
      console.log(this.tipoPersonas);
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalTipoPersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if(res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tipo persona',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.getTipoPersonas();
      }
    }).catch(err => {});
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalTipoPersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tipeId = item.tipeId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tipo persona',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getTipoPersonas();
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.tipeId;
    const mensaje = '¿ Desea eliminar  ' + item.tipeNombre + ' ?';
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#0F3971',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.tipoPersonaService.delete$(ID).subscribe(response => {
            if (response.success) {
              Swal.fire({
                title: 'Eliminado',
                text: response.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#0F3971',
                timer: 1500,
              });
              this.getTipoPersonas();
            }
          });
        }
      });
    }
  }

}
