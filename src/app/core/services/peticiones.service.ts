import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { RutaGlobalModule } from "../models/ruta-global.module";

@Injectable({
  providedIn: "root",
})
export class PeticionesService {
  // variable que va a contener el token del usuario para poderlo guardar en el localStorage
  userToken: string;
  // variable instanciada que va a contener la ruta global para el consumo de la API
  rutaPadre: RutaGlobalModule = new RutaGlobalModule();

  constructor(
    private http: HttpClient,
    private router: Router,
    private state: ActivatedRoute
  ) {
    this.leerToken();
  }

  /**
   * Metodo postLogin exclusivo para el login
   * @param url => se debe especificar la url en un string
   * @param data => se debe especificar los datos a enviar y deben ser objetos
   */
  postLogin(url: string, data: object) {
    return this.http.post(url, data).pipe(
      map((res) => {
        this.guardarToken(res['datos'].token, res['datos'].expires_in);
        return res;
      })
    );
  }

  /**
   * Metodo getMenu que se encarga de consultar el menu del usuario segun el token
   * @param url => se debe especificar la url en un string
   */
  getMenu(url: string) {
    const headers = this.cabecera();
    return this.http.get(`${this.rutaPadre.rutaGlobal}${url}`, { headers });
  }

  /**
   * Metodo GET de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer GET
   */
  get(url: string) {
    // verificamos si el token no ha expirado
    if (this.estaAutenticado()) {
      const headers = this.cabecera();
      return this.http.get(`${this.rutaPadre.rutaGlobal}${url}`, { headers });
    }
    // en caso de que el token halla expirado nos devolvemos al login capturando la ultima ruta conocida por el usuario
    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: this.state.snapshot["_routerState"].url },
    });
  }

  /**
   * Metodo POST de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer POST
   * @param data => los datos que se van a enviar al momento de ejecutar del metodo POST
   */
  post(url: string, data: object) {
    // verificamos si el token no ha expirado
    if (this.estaAutenticado()) {
      const header = this.cabecera();
      return this.http.post(`${this.rutaPadre.rutaGlobal}${url}`, data, {
        headers: header,
      });
    }
    // en caso de que el token halla expirado nos devolvemos al login capturando la ultima ruta conocida por el usuario
    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: this.state.snapshot["_routerState"].url },
    });
  }

  /**
   * Metodo PUT de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer PUT
   * @param data => los datos que se van a enviar al momento de ejecutar del metodo PUT
   */
  put(url: string, data: object) {
    // verificamos si el token no ha expirado
    if (this.estaAutenticado()) {
      const header = this.cabecera();
      return this.http.put(`${this.rutaPadre.rutaGlobal}${url}`, data, {
        headers: header,
      });
    }
    // en caso de que el token halla expirado nos devolvemos al login capturando la ultima ruta conocida por el usuario
    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: this.state.snapshot["_routerState"].url },
    });
  }

  /**
   * Metodo PATCH de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer PATCH
   * @param data => los datos que se van a enviar al momento de ejecutar del metodo PATCH
   */
  patch(url: string, data: object) {
    // verificamos si el token no ha expirado
    if (this.estaAutenticado()) {
      const header = this.cabecera();
      return this.http.patch(`${this.rutaPadre.rutaGlobal}${url}`, data, {
        headers: header,
      });
    }
    // en caso de que el token halla expirado nos devolvemos al login capturando la ultima ruta conocida por el usuario
    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: this.state.snapshot["_routerState"].url },
    });
  }

  /**
   * Metodo DELETE de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer DELETE
   */
  delete(url: string) {
    // verificamos si el token no ha expirado
    if (this.estaAutenticado()) {
      const header = this.cabecera();
      return this.http.delete(`${this.rutaPadre.rutaGlobal}${url}`, {
        headers: header,
      });
    }
    // en caso de que el token halla expirado nos devolvemos al login capturando la ultima ruta conocida por el usuario
    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: this.state.snapshot["_routerState"].url },
    });
  }

  /**
   * Metodo CABECERA el cual sirve para generar la cabecera inicial obligatoria de consumo de la API
   */
  private cabecera() {
    const token = localStorage.getItem("token").toString();

    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return header;
  }

  /**
   * guardamos el token y el tiempo de expiracion que quedo de 1 hora
   * @param token => parametro que hace referencia al token de autenticacion para las diferentes peticiones
   * @param token_expire => parametro que hace referencia al tiempo de expiracion del token
   */
  private guardarToken(token: string, tokenExpire: number | string) {
    this.userToken = token;
    localStorage.setItem("token", this.userToken);

    const hoy: Date = new Date();
    hoy.setSeconds(Number(tokenExpire) * 60);

    localStorage.setItem("expira", hoy.getTime().toString());
  }

  /**
   * Metodo LEERTOKEN el cual sirve para leer el token en caso de existir en el localstorage
   */
  leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  /**
   * Metodo para validar la autenticacion y terminar la sesion que por defecto quedo de 1 hora
   */
  estaAutenticado() {
    if (!localStorage.getItem("isLoggedin") || !localStorage.getItem("token")) {
      return false;
    }

    const expira = Number(localStorage.getItem("expira"));
    const expiraDate: Date = new Date();

    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedin');
      localStorage.removeItem('expira');
      return false;
    }
  }
}
