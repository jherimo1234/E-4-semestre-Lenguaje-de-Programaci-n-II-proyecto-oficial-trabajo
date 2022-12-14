import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CarreraService} from "../../../../providers/service/carrera.service";

@Component({
  selector: 'app-form-modal-carreras',
  templateUrl: './form-modal-carreras.component.html',
  styleUrls: ['./form-modal-carreras.component.css']
})
export class FormModalCarrerasComponent implements OnInit {

  @Input() title: any;
  @Input() carrId: any;
  @Input() item: any;
  frmCarrera: FormGroup;
  selected = 'option2';
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private carreraService: CarreraService) { }

  ngOnInit(): void {
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      carrNombre: ['', [Validators.required]],
      carrCiclo: ['', [Validators.required]]
    };
    this.frmCarrera = this.formBuilder.group(controls);
  }

  save(): void {
    this.carreraService.add$(this.frmCarrera.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message});
      }
    });
  }

  update(): void {
    this.carreraService.update$(this.carrId, this.frmCarrera.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message});
      }
    });
  }

  updateData(): void {
    this.frmCarrera.patchValue(this.item);
  }
}
