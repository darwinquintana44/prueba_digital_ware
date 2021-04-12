import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { RutaGlobalModule } from '../models/ruta-global.module';
import { PeticionesService } from './peticiones.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // url de login la hacemos igual a la clase del modelo que contiene
  // las rutas globales de la aplicacion
  url: RutaGlobalModule;

  /**
   * Constructor del servicio
   * @param http => parametro que nos ayudara a hacer los respectivos consumos a la API
   * @param peticiones => servicio creado para realizar cualquier tipo de peticion a la API
   */
  constructor( private peticiones:PeticionesService ) {
    // inicializamos o instaciamos el modelos a la variable
    this.url = new RutaGlobalModule();
  }

  // metodo para hacer o efectuar el login en el sistema
  logIn( loginData: LoginModel ) {
    // creamos una constante que va a almacenar los datos requeridos para hacer login
    const enviarDatos = {
      ...loginData
    };

    // retornamos los datos segun la peticion POST para hacer login en el sistema
    return this.peticiones.postLogin(this.url.rutaLogin, enviarDatos);
  }

  // metodo que al consumir se traera el menu segun corresponda al usuario dependiendo del token
  menu(urlMenu: string){
    return this.peticiones.getMenu(urlMenu);
  }

  /**
   * metodo para validar la autenticacion y terminar la sesion que por defecto quedo de 1 hora
   */
  estaAutenticado(){
    return this.peticiones.estaAutenticado();
  }
}
