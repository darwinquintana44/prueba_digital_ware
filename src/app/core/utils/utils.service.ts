import { Injectable } from "@angular/core";
import { PeticionesService } from "../services/peticiones.service";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UtilsServices {
  constructor(private peticiones: PeticionesService, private route: Router,) {}

  save(url, formData, model, id?) {
    // validamos si el formulario es invalido, si es cierto devolvemos un mensaje de validacion,
    // de lo contrario seguimos guardando la informacion
    if (formData.invalid) {
      Swal.fire({
        text: "Todos los campos son obligatorios",
        icon: "info",
      });
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      title: "Espere Por Favor...",
      text: "La información se esta procesando",
      icon: "info",
    });
    // ejecutamos el loading del swal
    Swal.showLoading();
    // si el id existe en el modelo significa que vamos a actualizar de lo contrario debemos insertar
    if (id) {
      // creamos una nueva contante que contenga los mismo datos que vienen del formulario
      const registroTemp = {
        ...model,
      };
      // eliminamos la propiedad id ya que no la necesitamos que se actualice en el sistema
      delete registroTemp.id;
      // ejecutamos la peticion PUT ya que es la que esta establecida para realizar la actualizacion
      this.peticiones
        .put(url +'/'+ model.id, registroTemp)
        // nos subcribimos al observable para poder capturar la informacion recibida del back cuando es correcta
        .subscribe(
          (data) => {
            Swal.close();
            Swal.fire({
              title: "Muy bien",
              text: "Registro actualizado correctamente",
              icon: "success",
            });
            return this.route.navigate([url]);
            // Si se obtiene algun error lo mostramos en pantalla
          },
          (err) => {
            Swal.close();
            Swal.fire({
              title: "Ha ocurrido un error",
              html: `<b>Se ha presentado el siguiente error: ${err}</b>`,
              icon: "error",
            });
          }
        );
    } else {
      // insertamos en la base de datos
      // ejecutamos la peticion POST y enviamos los datos a guardar
      this.peticiones
        .post(url, model)
        // el pipe nos sirve para capturar la informacion y poderla transformar o manipularla
        .pipe(
          map((data: any) => {
            model.id = data["data"].id;
            return data;
          })
          // nos subcribimos al observable para poder capturar la informacion recibida del back cuando es correcta
        )
        .subscribe(
          (data) => {
            // cerramos el loadin del swal
            Swal.close();
            Swal.fire({
              title: "Muy bien",
              text: "Registro creado correctamente",
              icon: "success",
            });
            return this.route.navigate([url]);
            // Si se obtiene algun error lo mostramos en pantalla
          },
          (err) => {
            Swal.close();
            Swal.fire({
              title: "Ha ocurrido un error",
              html: `<b>Se ha presentado el siguiente error: ${err}</b>`,
              icon: "error",
            });
          }
        );
    }
  }
}
