import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PeticionesService} from "../../../../core/services/peticiones.service";

@Component({
  selector: 'app-listar-datos',
  templateUrl: './listar-datos.component.html',
  styleUrls: ['./listar-datos.component.scss']
})
export class ListarDatosComponent implements OnInit {
  // Definimos la variable que vamos a utilizar para el dibujado del datatable
  dtOptions: DataTables.Settings = {};
  // instanciamos el datatable y realizamos las diferentes configuraciones iniciales
  datatable: any;
  // variable que me va a controlar el loading para que muestre la informacion
  cargando: boolean = false;
  // variable que va a contener los datos de la consulta
  usuarios: object = {};

  constructor(private peticiones: PeticionesService, private route: Router) {
    // validamos que el usuario sea unicamente administrados para poder ingresar a este menu de lo contrario lo devolvemos al home
    if (localStorage.getItem('rol_asignado') != 'admin') {
      // volvemos al home en caso de que esto se presente
      this.route.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.consultaUsuarios();
    this.dataTable();
  }

  // metodo de consulta de los usuarios del sistema
  consultaUsuarios() {
    this.cargando = true;
    // realizamos la peticion al back
    this.peticiones.get('apiglobal/usuarios/listado').subscribe(data => {
      this.usuarios = data;
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
