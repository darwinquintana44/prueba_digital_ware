import { MenuItem } from './menu.model';
import { Label } from 'ng2-charts';

export const MENUADMIN: MenuItem[] = [
  {
    label: 'Módulo Global',
    isTitle: true
  },
  {
    label: 'Herramientas',
    icon: 'settings',
    subItems: [
      {
        label: 'Usuarios',
        subItems: [
          {
            label: 'Listar Datos',
            link: '/herramientas/usuarios/listado'
          }
        ]
      }
    ]
  },
  {
    label: 'Generales',
    isTitle: true
  },
  {
    label: 'Pasajeros',
    icon: 'user',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/pasajeros/listado',
      }
    ]
  },
  {
    label: 'Piloto',
    icon: 'user',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/pilotos/listado',
      }
    ]
  },
  {
    label: 'Aero Naves',
    icon: 'users',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/aeronaves/listado',
      }
    ]
  },
  {
    label: 'Alquiler Aero Naves',
    icon: 'users',
    subItems: [
      {
        label: 'Alquilar',
        link: '/aeronaves/alquiler',
      }
    ]
  }
];

export const MENUPILOTO: MenuItem[] = [
  {
    label: 'Generales',
    isTitle: true
  },
  {
    label: 'Piloto',
    icon: 'user',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/pilotos/listado',
      }
    ]
  },
  {
    label: 'Aero Naves',
    icon: 'calendar',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/aeronaves/listado',
      }
    ]
  },
  {
    label: 'Alquiler Aero Naves',
    icon: 'users',
    subItems: [
      {
        label: 'Alquilar',
        link: '/aeronaves/alquiler',
      }
    ]
  }
];

export const MENUPASAJERO: MenuItem[] = [
  {
    label: 'Generales',
    isTitle: true
  },
  {
    label: 'Pasajeros',
    icon: 'user',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/pasajeros/listado',
      }
    ]
  },
];
