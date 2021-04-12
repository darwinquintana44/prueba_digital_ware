import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasajerosComponent } from './pasajeros.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {DataTablesModule} from "angular-datatables";
import {NgbDatepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

import { CrudComponent } from './crud/crud.component';
import { CrearEditarPasajeroComponent } from './crud/crear-editar-pasajero/crear-editar-pasajero.component';
import {PasajerosRoutingModule} from "./pasajeros-routing.module";



@NgModule({
  declarations: [PasajerosComponent, CrudComponent, CrearEditarPasajeroComponent],
  imports: [
    CommonModule,
    PasajerosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbTooltipModule,
    NgbDatepickerModule,
  ]
})
export class PasajerosModule { }
