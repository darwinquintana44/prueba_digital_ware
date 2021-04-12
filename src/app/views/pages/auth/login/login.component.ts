import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginModel } from '../../../../core/models/login.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // varibale que almacena la ruta absula a la cual se redigira despues de hacer login
  returnUrl: any;
  // variable que contiene los datos del modelo creado para las variables que se usaran en el login
  loginData: LoginModel;
  // variable que se va a utilizar para el recordarme
  recordarme: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // inicializamos o instanciamos la variable loginData
    this.loginData = new LoginModel();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    // inicializamos la variable en false
    this.recordarme = false;
    // verificamos si existen los valores de user y codigo en el localStorage
    if (localStorage.getItem('user')) {
      this.loginData.email = localStorage.getItem('user');
      this.recordarme = true;
    }
  }

  /**
   * Metodo login
   * @param formData = parametro que recibe todos los datos del formulario
   *
   * este metodo sirve para realizar las respectivas validaciones segun
   * la informacion enviada desde el html verificando que todos los datos
   * cumplan con lo requerido
   */
  login(formData: NgForm) {
    // validamos que la propiedad invalid sea verdadera para terminar el proceso en esa misma linea
    // de lo contrario seguira con el proceso de manera normal
    if (formData.invalid) {
      return Swal.fire({
        allowOutsideClick: false,
        icon: 'warning',
        title: 'Faltan campos...',
        text: 'Por favor completa el formulario',
      });
    }

    // mostramos un Swal con la informacion para que el usuario espere mientras se hace la verificacion de datos
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Espere Por Favor...',
      text: 'El sistema esta procesando la información',
    });

    // inicializamos el loadin en el Swal
    Swal.showLoading();

    // llamamos el servicio creado para el login y hacemos el consumo del metodo de la API
    this.auth.logIn(this.loginData).subscribe(data => {
        // cuando esta correcto la peticion se muestra el subscribe
        Swal.close(); // cerramos el swal
        localStorage.setItem('correo_electronico', data['datos'].usuario.correo);
        localStorage.setItem('nombre_completo', `${data['datos'].usuario.nombre_completo}`);
        localStorage.setItem('rol_asignado', `${data['datos'].usuario.rol_asignado}`);

        // validamos el recordarme y agregamos 2 nuevos datos en el localStorage
        if (this.recordarme) {
          localStorage.setItem('user', this.loginData.email);
        } else {
          // sino entonces removemos los datos del localStorage
          localStorage.removeItem('user');
        }

        // setiamos el siguiente valor en el localStorage para validar tambien que esta logeado
        localStorage.setItem('isLoggedin', 'true');
        // si el valor existe en el localStorage navegamos a la url establecida cuando se cerro la sesion o al dashboard
        if (localStorage.getItem('isLoggedin')) {
          this.router.navigate([this.returnUrl]);
        }
      },
      err => {
        // el subscribe tambien puede captar el error en caso de existir
        // mostramos el error en el swal validando el mensaje que se va a mostrar
        let msgError: string = err.statusText;
        if (err.status === 401) {
          msgError = err.error;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error en la autenticaciónnn',
          html: `<h5>Se ha presentado el siguiente error en el sistema<br>
               <b>Error: ${err.status}<br> Mensaje: ${msgError}</b></h5>`,
        });
      }
    );
  }
}
