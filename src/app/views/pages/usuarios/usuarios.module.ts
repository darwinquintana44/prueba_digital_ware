import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {DataTablesModule} from "angular-datatables";
import {NgbDatepickerModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

import {UsuariosRoutingModule} from "./usuarios-routing.module";

import { UsuariosComponent } from './usuarios.component';
import { ListarDatosComponent } from './listar-datos/listar-datos.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    ListarDatosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbTooltipModule,
    NgbDatepickerModule,
  ]
})
export class UsuariosModule { }
