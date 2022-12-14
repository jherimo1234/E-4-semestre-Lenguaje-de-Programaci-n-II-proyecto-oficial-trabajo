import { Component, OnInit } from '@angular/core';
import {TallerService} from "../../providers/service/taller.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  talleres: any = [];

  constructor(private tallerService: TallerService) { }

  ngOnInit(): void {
    this.getTalleres();
  }

  getTalleres(): void{
    this.tallerService.getAll$().subscribe(response => {
      /*console.log(response);/*aca se guarda toda la info del backend*/
      this.talleres = response.data || []; /*|| es OR*/
      console.log(this.talleres);
    });
  }


}
