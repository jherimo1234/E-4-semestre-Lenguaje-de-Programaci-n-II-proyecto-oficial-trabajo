import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TallerService} from "../../../providers/service/taller.service";
import Swal from "sweetalert2";
import {FormModalTalleresComponent} from "./form-modal-talleres/form-modal-talleres.component";
import {ManageModalTalleresComponent} from "./manage-modal-talleres/manage-modal-talleres.component";

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {

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

  openModal(): void {
    const modal = this.modalService.open(FormModalTalleresComponent, {
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
          title: 'Taller',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.getTalleres();
      }
    }).catch(err => {});
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalTalleresComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tallId = item.tallId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Taller',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getTalleres();
      }
    }).catch(res => {
    });
  }

  openModalGestionar(item: any): any {
    const modal = this.modalService.open(ManageModalTalleresComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.tallId = item.tallId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Gestionar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Taller',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getTalleres();
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.tallId;
    const mensaje = '¿ Desea eliminar ' + item.tallTema + ' ?';
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
          this.tallerService.delete$(ID).subscribe(response => {
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
              this.getTalleres();
            }
          });
        }
      });
    }
  }

}
