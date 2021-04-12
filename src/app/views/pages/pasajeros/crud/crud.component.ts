import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {PeticionesService} from "../../../../core/services/peticiones.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  // Definimos la variable que vamos a utilizar para el dibujado del datatable
  dtOptions: DataTables.Settings = {};
  // instanciamos el datatable y realizamos las diferentes configuraciones iniciales
  datatable: any;
  // variable que me va a controlar el loading para que muestre la informacion
  cargando: boolean = false;
  // variable que va a contener los datos de la consulta
  datosConsultados: object = {};

  constructor(private peticiones: PeticionesService, private route: Router) {
    // validamos que el usuario sea unicamente administrados para poder ingresar a este menu de lo contrario lo devolvemos al home
    if (localStorage.getItem('rol_asignado') == 'piloto') {
      // volvemos al home en caso de que esto se presente
      this.route.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.consultaDatos();
    this.dataTable();
  }

  // metodo de consulta de los usuarios del sistema
  consultaDatos() {
    this.cargando = true;
    // realizamos la peticion al back
    this.peticiones.get('apiprueba/pasajeros/listado').subscribe(data => {
      this.datosConsultados = data;
      this.cargando = false;
    });
  }

  /**
   * Utilizamos este metodo para hacer la eliminacion un poco mas manual por medio del Swal
   * @param nombre => parametro que va a contener el nombre del registro para mostrarlo en el Swal
   * @param id => parametro que va a contener el id de la tabla para hacer el respectivo consumo a la ruta ya esta necesita el id
   */
  eliminar(nombre: string, id: number) {
    this.cargando = true;
    // inicialisamos el Swal para proceder con la eliminacion del registro
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea eliminar el registro: ${nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      // el Swal devuelve una promesa por lo que la usamos cuando la informacion este correcto
      if (resp.value) {
        // al dar click en el boton de confirmar el value queda en true por lo que procedemos a eliminiar
        // realizamos el consumo para la respectiva eliminacion del registro
        this.peticiones.delete(`apiprueba/pasajeros/${id}`).subscribe(
          (data) => {
            Swal.fire({
              title: 'Muy bien',
              text: 'Registro Eliminado correctamente',
              icon: 'success',
            });
            // despues de eliminar correctamente el registro volvemos a cargar la informacion en pantalla
            this.consultaDatos();
          },
          (err) => {
            Swal.fire({
              title: 'Ha ocurrido un error',
              html: `<b>Se ha presentado el siguiente error: ${err}</b>`,
              icon: 'error',
            });
          }
        );
      }
      this.cargando = false;
    });
  }

  // metodo de configuracion del datatable
  dataTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: false,
      processing: true,
      info: true,
      deferLoading: 57,
      destroy: true,
      responsive: true,
      ordering: true,
      order: [[0, 'desc']],
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
      }
    }
  }

}
