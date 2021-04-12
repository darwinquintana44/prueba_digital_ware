import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import {UsuariosComponent} from "./usuarios.component";
import {ListarDatosComponent} from "./listar-datos/listar-datos.component";

const routes: Routes = [
  {
    path: "",
    component: UsuariosComponent,
    children: [
      // rutas para listar los usuarios
      { path: "usuarios/listado", component: ListarDatosComponent },
      // ruta en caso de que la ruta no exista
      { path: "", pathMatch: "full", redirectTo: "/dashboard" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
