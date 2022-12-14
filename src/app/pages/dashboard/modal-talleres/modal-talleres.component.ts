import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {PersonaTallerService} from "../../../providers/service/persona-taller.service";
import {PersonaService} from "../../../providers/service/persona.service";
import {TallerService} from "../../../providers/service/taller.service";

@Component({
  selector: 'app-modal-talleres',
  templateUrl: './modal-talleres.component.html',
  styleUrls: ['./modal-talleres.component.css']
})
export class ModalTalleresComponent implements OnInit {

  @Input() item: any;
  @Input() title: any;
  @Input() tallId: any;
  talleres: any = [];
  personasTaller: any = [];
  personas: any = [];

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private personaTallerService: PersonaTallerService,
              private personaService: PersonaService,
              private tallerService: TallerService,) { }

  ngOnInit(): void {
    this.getPersonaTaller();
    this.getTalleres();
    this.getPersonas();
  }

  getPersonaTaller(): void{
    this.personaTallerService.getAll$().subscribe(response => {
      this.personasTaller = response.data || []; /*|| es OR*/
      console.log(this.personasTaller);
    });
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
}
