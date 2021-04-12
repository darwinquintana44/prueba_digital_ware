import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import {CrudComponent} from "./crud/crud.component";
import {AeronavesComponent} from "./aeronaves.component";
import {CrearEditarAeronavesComponent} from "./crud/crear-editar-aeronaves/crear-editar-aeronaves.component";


const routes: Routes = [
  {
    path: "",
    component: AeronavesComponent,
    children: [
      // rutas para listar los usuarios
      { path: "listado", component: CrudComponent },
      { path: "crear_editar/:id", component: CrearEditarAeronavesComponent },
      // ruta en caso de que la ruta no exista
      { path: "", pathMatch: "full", redirectTo: "/dashboard" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AeronavesRoutingModule {}
