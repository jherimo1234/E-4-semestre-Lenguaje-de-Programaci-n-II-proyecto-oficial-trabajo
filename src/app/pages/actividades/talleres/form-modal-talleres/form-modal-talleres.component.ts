import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProgramaService} from "../../../../providers/service/programa.service";
import {TallerService} from "../../../../providers/service/taller.service";

@Component({
  selector: 'app-form-modal-talleres',
  templateUrl: './form-modal-talleres.component.html',
  styleUrls: ['./form-modal-talleres.component.css']
})
export class FormModalTalleresComponent implements OnInit {

  @Input() title: any;
  @Input() tallId: any;
  @Input() item: any;
  frmTaller: FormGroup;
  programas: any = [];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private tallerService: TallerService,
              private programaService: ProgramaService) { }


  ngOnInit(): void {
    this.formInit();
    this.getProgramas();
    if(this.item){
      this.updateData();
    }
  }

  getProgramas(): void{
    this.programaService.getAll$().subscribe(response => {
      this.programas = response.data || []; /*|| es OR*/
      console.log(this.programas);
    });
  }

  formInit(): void {
    const controls = {
      tallTema: ['', [Validators.required]],
      tallHora: ['', [Validators.required]],
      tallFecha: ['', [Validators.required]],
      tallDireccion: ['', [Validators.required]],
      tallLugar: ['', [Validators.required]],
      progId: ['', [Validators.required]]
    };
    this.frmTaller = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmTaller.value,
      {programa: {progId: this.frmTaller.value.progId}});
    this.tallerService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });//serializa y envia formato tipo JS
  }
/*Aca actualiza los datos*/
  update(): void {
    let data = Object.assign(this.frmTaller.value,
      {programa: {progId: this.frmTaller.value.progId}});
    console.log(data);
    this.tallerService.update$(this.tallId, data).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });
  }
/*Esto llena las cajas de textos con los datos*/
  updateData(): void {
    let data = Object.assign(this.item,
      {progId: this.item.programa.progId});
    console.log(data, "");
    this.frmTaller.patchValue(data);
  }
}
