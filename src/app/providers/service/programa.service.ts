import { Injectable } from '@angular/core';
import {EntityDataService} from "../utils/entity-data.service";
import {IResponse} from "../utils/response";
import {END_POINTS} from "../utils/end-points";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProgramaService extends EntityDataService<IResponse> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.api+END_POINTS.actividades.programa)/*es de persona por prueba*/
  }
}
