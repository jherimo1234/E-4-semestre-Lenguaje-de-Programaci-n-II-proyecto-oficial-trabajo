import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { ProgramaService } from 'src/app/providers/service/programa.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  @Input() title: any;
  @Input() progId: any;
  @Input() item: any;
  frmPrograma: FormGroup;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private programaService: ProgramaService) { }

  ngOnInit(): void {
    this.formInit();
    if(this.item){
      this.updateData();
    }
  }

  formInit(): void {
    const controls = {
      progNombre: ['', [Validators.required]],
      progDescripcion: ['', [Validators.required]]
    };
    this.frmPrograma = this.formBuilder.group(controls);
  }

  save(): void {
    this.programaService.add$(this.frmPrograma.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message});
      }
    });
  }

  update(): void {
    this.programaService.update$(this.progId, this.frmPrograma.value).subscribe(response => {
      if (response.success){
        this.activeModal.close({
          success: true,
          message: response.message});
      }
    });
  }

  updateData(): void {
    this.frmPrograma.patchValue(this.item);
  }
}
