import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {PilotosComponent} from "./pilotos.component";
import {CrudComponent} from "./crud/crud.component";
import {CrearEditarPilotosComponent} from "./crud/crear-editar-pilotos/crear-editar-pilotos.component";


const routes: Routes = [
  {
    path: "",
    component: PilotosComponent,
    children: [
      // rutas para listar los usuarios
      { path: "listado", component: CrudComponent },
      { path: "crear_editar/:id", component: CrearEditarPilotosComponent },
      // ruta en caso de que la ruta no exista
      { path: "", pathMatch: "full", redirectTo: "/dashboard" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilotosRoutingModule {}
