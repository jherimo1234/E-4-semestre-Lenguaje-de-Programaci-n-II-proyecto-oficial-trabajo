import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TipoPersonaService} from "../../../../providers/service/tipo-persona.service";

@Component({
  selector: 'app-form-modal-tipo-personas',
  templateUrl: './form-modal-tipo-personas.component.html',
  styleUrls: ['./form-modal-tipo-personas.component.css']
})
export class FormModalTipoPersonasComponent implements OnInit {

  @Input() title: any;
  @Input() tipeId: any;
  @Input() item: any;
  frmTipoPersona: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private tipoPersonaService: TipoPersonaService) { }

  ngOnInit(): void {
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      tipeNombre: ['', [Validators.required]]
    };
    this.frmTipoPersona = this.formBuilder.group(controls);
  }

  save(): void {
    this.tipoPersonaService.add$(this.frmTipoPersona.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message});
      }
    });
  }

  update(): void {
    console.log(this.tipeId);
    console.log(this.frmTipoPersona.value);
    this.tipoPersonaService.update$(this.tipeId, this.frmTipoPersona.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message});
      }
    });
  }

  updateData(): void {
    this.frmTipoPersona.patchValue(this.item);
  }

}
