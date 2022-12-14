import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EncuestaService} from "../../../providers/service/encuesta.service";
import Swal from "sweetalert2";
import {FormModalEncuestasComponent} from "./form-modal-encuestas/form-modal-encuestas.component";

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  encuestas: any = [];

  constructor(private encuestaService: EncuestaService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEncuestas();
  }

  getEncuestas(): void{
    this.encuestaService.getAll$().subscribe(response => {
      this.encuestas = response.data || []; /*|| es OR*/
      console.log(this.encuestas);
    });
  }


  openModal(): void {
    const modal = this.modalService.open(FormModalEncuestasComponent, {
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
          title: 'Encuesta',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.getEncuestas();
      }
    }).catch(err => {});
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalEncuestasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.encuId = item.encuId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Encuesta',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getEncuestas();
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.encuId;
    const mensaje = '¿ Esta seguro que Desea eliminar ?';
    if (ID) {
      Swal.fire({
        title: 'Se eliminará la encuesta',
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
          this.encuestaService.delete$(ID).subscribe(response => {
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
              this.getEncuestas();
            }
          });
        }
      });
    }
  }

}
