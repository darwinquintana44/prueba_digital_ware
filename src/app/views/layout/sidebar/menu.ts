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
            link: '/global/estados-generales'
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
    icon: 'users',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/apps/email/inbox',
      }
    ]
  },
  {
    label: 'Piloto',
    icon: 'users',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/apps/email/inbox',
      }
    ]
  },
  {
    label: 'Alquiler Aero Naves',
    icon: 'calendar',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/apps/email/inbox',
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
    icon: 'users',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/apps/email/inbox',
      }
    ]
  },
  {
    label: 'Alquiler Aero Naves',
    icon: 'calendar',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/apps/email/inbox',
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
    icon: 'users',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/apps/email/inbox',
      }
    ]
  },
  {
    label: 'Alquiler Aero Naves',
    icon: 'calendar',
    subItems: [
      {
        label: 'Listar Datos',
        link: '/apps/email/inbox',
      }
    ]
  }
];
