import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";
import {NgbDatepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

import {AeronavesRoutingModule} from "./aeronaves-routing.module";

import { AeronavesComponent } from './aeronaves.component';
import { CrearEditarAeronavesComponent } from './crud/crear-editar-aeronaves/crear-editar-aeronaves.component';
import { CrudComponent } from './crud/crud.component';



@NgModule({
  declarations: [AeronavesComponent, CrearEditarAeronavesComponent, CrudComponent],
  imports: [
    CommonModule,
    AeronavesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbTooltipModule,
    NgbDatepickerModule,
  ]
})
export class AeronavesModule { }
