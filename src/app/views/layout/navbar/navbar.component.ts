import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LoginModel } from '../../../core/models/login.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario: LoginModel;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.usuario = new LoginModel();
  }

  ngOnInit(): void {
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    // borramos todos los datos que no se deben recordar en el localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('expira');
    localStorage.removeItem('correo_electronico');
    localStorage.removeItem('nombre_completo');
    localStorage.removeItem('rol_asignado');

    // validamos si no esta logueado hacemos una redireccion al login
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  /**
   * obtenemos los datos del usuario directamente desde el localStorage
   */
  get getUser() {
    return localStorage.getItem('nombre_completo');
  }

  get getCorreoUser() {
    return localStorage.getItem('correo_electronico');
  }

}
