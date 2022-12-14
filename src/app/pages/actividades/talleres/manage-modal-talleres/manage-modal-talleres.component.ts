import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonaTallerService} from "../../../../providers/service/persona-taller.service";
import {TallerService} from "../../../../providers/service/taller.service";
import {PersonaService} from "../../../../providers/service/persona.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-manage-modal-talleres',
  templateUrl: './manage-modal-talleres.component.html',
  styleUrls: ['./manage-modal-talleres.component.css']
})
export class ManageModalTalleresComponent implements OnInit {

  @Input() item: any;
  @Input() title: any;
  @Input() tallId: any;
  frmPersonaTaller: FormGroup;
  talleres: any = [];
  personasTaller: any = [];
  personas: any = [];
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaTallerService: PersonaTallerService,
              private personaService: PersonaService,
              private tallerService: TallerService) { }

  ngOnInit(): void {
    this.formInit();
    this.getPersonaTaller();
    this.getTalleres();
    this.getPersonas();
  }

  getTalleres(): void{
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || []; /*|| es OR*/
      console.log(this.talleres);
    });
  }

  getPersonas(): void{
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || []; /*|| es OR*/
      console.log(this.personas);
    });
  }

  getPersonaTaller(): void{
    this.personaTallerService.getAll$().subscribe(response => {
      this.personasTaller = response.data || []; /*|| es OR*/
      console.log(this.personasTaller);
    });
  }

  formInit(): void {
    const controls = {
      taller: ['', [Validators.required]],
      persona: ['', [Validators.required]]
    };
    this.frmPersonaTaller = this.formBuilder.group(controls);
  }

  assign(): void {
    let data = Object.assign(this.frmPersonaTaller.value,
      {persona: {persId: this.frmPersonaTaller.value.persona}},
      {taller: {tallId: this.frmPersonaTaller.value.taller}});
    this.personaTallerService.add$(data).subscribe(response =>{
      if (response.success) {
        this.activeModal.close({
          success: true,
          message: response.message
        });
      }
    });//serializa y envia formato tipo JS
  }

  public onAsistio(item: any): void {
    const IdAsistio = item.petaId;
    const persIdAsistio = item.persona.persId;
    const tallIdAsistio = item.taller.tallId
    const mensaje = '¿ Estas seguro que asistio ?';
      Swal.fire({
        title: 'Confirmación de la asistencia',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#0F3971',
        confirmButtonText: 'Si!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {

          let data = Object.assign(
            {taller: {tallId: tallIdAsistio}},
            {persona: {persId: persIdAsistio}},
            {petaAsistencia: 'A'});
          // @ts-ignore
          this.personaTallerService.update$(IdAsistio, data).subscribe(response => {
            if (response.success) {
              Swal.fire({
                title: 'Asistencia guardada',
                text: response.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#0F3971',
                timer: 1500,
              });
              this.getPersonaTaller();
              this.getTalleres();
              this.getPersonas();
            }
          });
        }
      });
  }

  public onFalto(item: any): void {
    const IDFalto = item.petaId;
    const persIdFalto = item.persona.persId;
    const tallIdFalto = item.taller.tallId
    const mensaje = '¿ Estas seguro que NO asistio ?';
    Swal.fire({
      title: 'Confirmación la inasistencia',
      text: `${mensaje}`,
      backdrop: true,
      //animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#0F3971',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let data = Object.assign(
          {taller: {tallId: tallIdFalto}},
          {persona: {persId: persIdFalto}},
          {petaAsistencia: 'F'});
        // @ts-ignore
        this.personaTallerService.update$(IDFalto, data).subscribe(response => {
          if (response.success) {
            Swal.fire({
              title: 'Inasistencia guardada',
              text: response.message,
              backdrop: true,
              //animation: true,
              showConfirmButton: false,
              confirmButtonColor: '#0F3971',
              timer: 1500,
            });
            this.getPersonaTaller();
            this.getTalleres();
            this.getPersonas();
          }
        });

      }
    });

  }
}
