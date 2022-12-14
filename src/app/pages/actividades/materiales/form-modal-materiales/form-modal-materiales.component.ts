import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MaterialService} from "../../../../providers/service/material.service";
import {TallerService} from "../../../../providers/service/taller.service";

@Component({
  selector: 'app-form-modal-materiales',
  templateUrl: './form-modal-materiales.component.html',
  styleUrls: ['./form-modal-materiales.component.css']
})
export class FormModalMaterialesComponent implements OnInit {

  @Input() title: any;
  @Input() mateId: any;
  @Input() item: any;
  taller: any = [];
  frmMaterial: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private tallerService: TallerService,
              private materialService: MaterialService) { }

  ngOnInit(): void {
    this.formInit();
    this.getTalleres();
    if(this.item){
      this.updateData();
    }
  }

  getTalleres(): void{
    this.tallerService.getAll$().subscribe(response => {
      this.taller = response.data || []; /*|| es OR*/
      console.log(this.taller);
    });
  }

  formInit(): void {
    const controls = {
      mateNombre: ['', [Validators.required]],
      mateDescripcion: ['', [Validators.required]],
      mateTipoMaterial: ['', [Validators.required]],
      tallId: ['', [Validators.required]],
    };
    this.frmMaterial = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmMaterial.value,
      {taller: {tallId: this.frmMaterial.value.tallId}});
    this.materialService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });//serializa y envia formato tipo JS
  }

  update(): void {
    let data = Object.assign(this.frmMaterial.value,
      {taller: {tallId: this.frmMaterial.value.tallId}});
    this.materialService.update$(this.mateId, data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });
  }

  updateData(): void {
    let data = Object.assign(this.item,
      {tallId: this.item.taller.tallId});
    this.frmMaterial.patchValue(data);
  }

}
