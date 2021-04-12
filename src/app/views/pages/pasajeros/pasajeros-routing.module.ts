import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import {CrudComponent} from "./crud/crud.component";
import {PasajerosComponent} from "./pasajeros.component";
import {CrearEditarPasajeroComponent} from "./crud/crear-editar-pasajero/crear-editar-pasajero.component";

const routes: Routes = [
  {
    path: "",
    component: PasajerosComponent,
    children: [
      // rutas para listar los usuarios
      { path: "listado", component: CrudComponent },
      { path: "crear_editar/:id", component: CrearEditarPasajeroComponent },
      // ruta en caso de que la ruta no exista
      { path: "", pathMatch: "full", redirectTo: "/dashboard" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasajerosRoutingModule {}
