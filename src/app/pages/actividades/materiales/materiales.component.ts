import { Component, OnInit } from '@angular/core';
import {MaterialService} from "../../../providers/service/material.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormModalMaterialesComponent} from "./form-modal-materiales/form-modal-materiales.component";

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

  materiales: any = [];

  constructor(private materialService: MaterialService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMateriales();
  }
  getMateriales(): void {
    this.materialService.getAll$().subscribe(response => {
      this.materiales = response.data || [];
      console.log(this.materiales);
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalMaterialesComponent, {
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
          title: 'Material',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.getMateriales();
      }
    }).catch(err => {});
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalMaterialesComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.mateId = item.mateId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Material',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getMateriales();
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.mateId;
    const mensaje = '¿ Desea eliminar ' + item.mateNombre + ' ?';
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
          this.materialService.delete$(ID).subscribe(response => {
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
              this.getMateriales();
            }
          });
        }
      });
    }
  }

}
