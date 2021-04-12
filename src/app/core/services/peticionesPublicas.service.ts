import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RutaGlobalModule } from '../models/ruta-global.module';

@Injectable({
  providedIn: 'root',
})
export class PeticionesPublicasService {
  // variable que va a contener el token del usuario para poderlo guardar en el localStorage
  userToken: string;
  // variable instanciada que va a contener la ruta global para el consumo de la API
  rutaPadre: RutaGlobalModule = new RutaGlobalModule();

  constructor(private http: HttpClient) { }

  /**
   * Metodo GET de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer GET
   */
  get(url: string) {
    return this.http.get(`${this.rutaPadre.rutaGlobal}${url}`);
  }

  /**
   * Metodo POST de consumo para las diferentes rutas de la API
   * @param url => se debe especificar la ruta a la cual se va a hacer POST
   * @param data => los datos que se van a enviar al momento de ejecutar del metodo POST
   */
  post(url: string, data: object) {
    return this.http.post(`${this.rutaPadre.rutaGlobal}${url}`, data);
  }
}
