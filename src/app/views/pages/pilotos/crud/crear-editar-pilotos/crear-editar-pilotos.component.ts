import { Component, OnInit } from '@angular/core';
import {PeticionesService} from "../../../../../core/services/peticiones.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {map} from "rxjs/operators";
import {PilotosModel} from "../models/piloto.model";

@Component({
  selector: 'app-crear-editar-pilotos',
  templateUrl: './crear-editar-pilotos.component.html',
  styleUrls: ['./crear-editar-pilotos.component.scss']
})
export class CrearEditarPilotosComponent implements OnInit {
  // variable instanciada con los datos necesario de la tabla
  piloto: PilotosModel = new PilotosModel();
  // variable que me va a controlar el loading para que muestre la informacion
  cargando: boolean = false;

  constructor(private peticiones: PeticionesService, private activatedRoute: ActivatedRoute, private route: Router ) {
    // validamos que el usuario sea unicamente administrados y pilotos para poder ingresar a este menu de lo contrario lo devolvemos al home
    if (localStorage.getItem('rol_asignado') == 'pasajero') {
      // volvemos al home en caso de que esto se presente
      this.route.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.cargando = true;
    // constante que va a capturar el parametro que venga en la url y que se llama id
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    // validamos si es diferente de nuevo para verificar que es una actualizacion lo que debemos hacer y no un insert
    if ( id !== 'nuevo'){
      // realizamos la peticion GET hacia el banco en especifico
      this.peticiones.get(`apiprueba/pilotos/listado/${id}`).subscribe(
        data => {
          // si la propiedad data viene en la respuesta significa que es valida la informacion a editar
          if(data['datos']){
            this.piloto.id = data['datos'].identificador;
            this.piloto.nombre_completo = data['datos'].nombre;
            this.piloto.nro_identificacion = data['datos'].numero_identificacion;
            this.piloto.direccion = data['datos'].direccion_notificacion;
            this.piloto.telefono = data['datos'].telefono_notificacion;
          }else{ // si no viene la propiedad data mostramos un error y hacemos la redireccion a la pagina principal anterior
            Swal.fire({
              title: 'Ha ocurrido un error',
              html: `<b>No hay información para mostrar</b>`,
              icon: 'error'
            });
            return this.route.navigate(['pilotos/listado']);
          }
          this.cargando = false;
        },err => {
          Swal.fire({
            title: 'Ha ocurrido un error',
            html: `<b>Se ha presentado el siguiente error: ${err}</b>`,
            icon: 'error'
          });
          return this.route.navigate(['pilotos/listado']);
        }
      )
    }
    this.cargando = false;
  }

  // metodo que vamos a utilizar para guardar la informacion
  guardar(form: NgForm): any {

    // validamos si el formulario es invalido, si es cierto devolvemos un mensaje de validacion,
    // de lo contrario seguimos guardando la informacion
    if (form.invalid) {
      Swal.fire({
        text: 'Todos los campos son obligatorios',
        icon: 'info'
      });
      return;
    }

    // si toda la informacion esta correcto ejecutamos el swal para que el usuario espere mientras carga la informacion
    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere Por Favor...',
      text: 'La información se esta procesando',
      icon: 'info'
    });

    // ejecutamos el loading del swal
    Swal.showLoading();

    // si el id existe en el modelo significa que vamos a actualizar de lo contrario debemos insertar
    if (this.piloto.id){
      // creamos una nueva contante que contenga los mismo datos que vienen del formulario
      const pilotoTemp = {
        ...this.piloto
      }
      // ejecutamos la peticion PATCH ya que es la que esta establecida para realizar la actualizacion
      this.peticiones.patch(`apiprueba/pilotos`, pilotoTemp)
        // nos subcribimos al observable para poder capturar la informacion recibida del back cuando es correcta
        .subscribe( data => {
          Swal.close();
          Swal.fire({
            title: 'Muy bien',
            text: 'Registro actualizado correctamente',
            icon: 'success'
          });
          // Si se obtiene algun error lo mostramos en pantalla
        }, (err) => {
          Swal.fire({
            title: 'Ha ocurrido un error',
            html: `<b>Se ha presentado el siguiente error: ${err}</b>`,
            icon: 'error'
          });
        });
    }else { // insertamos en la base de datos
      // ejecutamos la peticion POST y enviamos los datos a guardar
      this.peticiones.post('apiprueba/pilotos', this.piloto)
        // el pipe nos sirve para capturar la informacion y poderla transformar o manipularla
        .pipe(
          map ( (data: any) => {
            this.piloto.id = data['datos'].identificador
            return data;
          })
          // nos subcribimos al observable para poder capturar la informacion recibida del back cuando es correcta
        ).subscribe( data => {
        // cerramos el loading del swal
        Swal.close();
        Swal.fire({
          title: 'Muy bien',
          text: 'Registro creado correctamente',
          icon: 'success'
        });
        return this.route.navigate(['pilotos/listado']);
        // Si se obtiene algun error lo mostramos en pantalla
      }, (err) => {
        Swal.fire({
          title: 'Ha ocurrido un error',
          html: `<b>Se ha presentado el siguiente error: ${err}</b>`,
          icon: 'error'
        });
      });
    }

  }

}
