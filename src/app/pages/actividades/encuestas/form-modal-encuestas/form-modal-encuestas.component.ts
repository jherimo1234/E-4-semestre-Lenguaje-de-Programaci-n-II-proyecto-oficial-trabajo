import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EncuestaService} from "../../../../providers/service/encuesta.service";
import {TallerService} from "../../../../providers/service/taller.service";
import {PersonaService} from "../../../../providers/service/persona.service";

@Component({
  selector: 'app-form-modal-encuestas',
  templateUrl: './form-modal-encuestas.component.html',
  styleUrls: ['./form-modal-encuestas.component.css']
})
export class FormModalEncuestasComponent implements OnInit {

  @Input() title: any;
  @Input() encuId: any;
  @Input() item: any;
  frmEncuesta: FormGroup;
  talleres: any = [];
  personas: any = [];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private encuestaService: EncuestaService,
              private tallerService: TallerService,
              private personaService: PersonaService) { }

  ngOnInit(): void {
    this.formInit();
    this.getTalleres();
    this.getPersonas();
    if(this.item){
      this.updateData();
    }
  }

  getTalleres(): void{
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || []; /*|| es OR*/
      console.log(this.talleres);
    });
  }
  getPersonas(): void{
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || [];
      console.log(this.personas);
    });
  }

  formInit(): void {
    const controls = {
      encuRespuestaUno: ['', [Validators.required]],
      tallId: ['', [Validators.required]],
      persId: ['', [Validators.required]]
    };
    this.frmEncuesta = this.formBuilder.group(controls);
  }

  save(): void {
    let data = Object.assign(this.frmEncuesta.value,
      {taller: {tallId: this.frmEncuesta.value.tallId}},
      {persona: {persId: this.frmEncuesta.value.persId}});
    this.encuestaService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });
  }

  update(): void {
    let data = Object.assign(this.frmEncuesta.value,
      {taller: {tallId: this.frmEncuesta.value.tallId}},
      {persona: {persId: this.frmEncuesta.value.persId}});
    console.log(data);
    this.encuestaService.update$(this.encuId, data).subscribe(response => {
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
      {tallId: this.item.taller.tallId},
      {persId: this.item.persona.persId});
    console.log(data, "hola, soy updateData");
    this.frmEncuesta.patchValue(data);
  }

}
