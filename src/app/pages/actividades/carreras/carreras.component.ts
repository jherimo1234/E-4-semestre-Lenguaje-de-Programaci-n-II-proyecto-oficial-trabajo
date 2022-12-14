import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {CarreraService} from "../../../providers/service/carrera.service";
import {FormModalCarrerasComponent} from "./form-modal-carreras/form-modal-carreras.component";

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  carreras: any = [];

  constructor(private carreraService: CarreraService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCarreras();
  }

  getCarreras(): void{
    this.carreraService.getAll$().subscribe(response => {
      this.carreras = response.data || []; /*|| es OR*/
      console.log(this.carreras);
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalCarrerasComponent, {
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
          title: 'Carrera',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.getCarreras();
      }
    }).catch(err => {});
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalCarrerasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.carrId = item.carrId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Carrera',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getCarreras();
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.carrId;
    const mensaje = '¿ Desea eliminar  ' + item.carrNombre + ' ' + item.carrCiclo + ' ?';
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
          this.carreraService.delete$(ID).subscribe(response => {
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
              this.getCarreras();
            }
          });
        }
      });
    }
  }

}
