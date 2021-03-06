import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'herramientas',
        loadChildren: () => import('./views/pages/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'pasajeros',
        loadChildren: () => import('./views/pages/pasajeros/pasajeros.module').then(m => m.PasajerosModule)
      },
      {
        path: 'pilotos',
        loadChildren: () => import('./views/pages/pilotos/pilotos.module').then(m => m.PilotosModule)
      },
      {
        path: 'aeronaves',
        loadChildren: () => import('./views/pages/aeronaves/aeronaves.module').then(m => m.AeronavesModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // redireccionamos al home cuando no exista una ruta
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } // redireccionamos al home cuando la ruta no sea valida
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Pagina No Encontrada',
      desc: 'Oopps!! La pagina que quieres ingresar no existe.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
