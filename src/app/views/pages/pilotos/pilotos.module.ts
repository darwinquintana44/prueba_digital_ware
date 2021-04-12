import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotosComponent } from './pilotos.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";
import {NgbDatepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

import {PilotosRoutingModule} from "./pilotos-routing.module";

import { CrudComponent } from './crud/crud.component';
import { CrearEditarPilotosComponent } from './crud/crear-editar-pilotos/crear-editar-pilotos.component';



@NgModule({
  declarations: [PilotosComponent, CrudComponent, CrearEditarPilotosComponent],
  imports: [
    CommonModule,
    PilotosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbTooltipModule,
    NgbDatepickerModule,
  ]
})
export class PilotosModule { }
