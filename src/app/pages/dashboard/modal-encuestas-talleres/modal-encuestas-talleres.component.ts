import {Component, Input, OnInit} from '@angular/core';
import {EncuestaService} from "../../../providers/service/encuesta.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-encuestas-talleres',
  templateUrl: './modal-encuestas-talleres.component.html',
  styleUrls: ['./modal-encuestas-talleres.component.css']
})
export class ModalEncuestasTalleresComponent implements OnInit {

  @Input() item: any;
  @Input() title: any;
  @Input() tallId: any;
  @Input() tallTema: any;
  encuestas: any = [];
  constructor(private encuestaService: EncuestaService,
              public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.getEncuestas();
  }

  getEncuestas(): void{
    this.encuestaService.getAll$().subscribe(response => {
      this.encuestas = response.data || []; /*|| es OR*/
      console.log(this.encuestas);
    });
  }
}
