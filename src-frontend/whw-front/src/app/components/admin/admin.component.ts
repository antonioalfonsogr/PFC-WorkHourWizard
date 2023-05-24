import { Component} from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador.model';
import { Cargo } from 'src/app/models/cargo.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor() { }

  workerList: Trabajador[] = [
    {
      idTrabajador: 1,
      nombre: 'John',
      apellido: 'Doe',
      dni: '12345678A',
      email: 'johndoe@example.com',
      password: 'password1',
      telefono: '123456789',
      cargo: Cargo.ADMIN,
      gestor: null,
      trabajadoresACargos: [],
      rangosHorariosTrabajador: []
    },
    {
      idTrabajador: 2,
      nombre: 'Jane',
      apellido: 'Smith',
      dni: '98765432B',
      email: 'janesmith@example.com',
      password: 'password2',
      telefono: '987654321',
      cargo: Cargo.GESTOR,
      gestor: {
        idTrabajador: 1,
        nombre: 'John',
        apellido: 'Doe',
        dni: '12345678A',
        email: 'johndoe@example.com',
        password: 'password1',
        telefono: '123456789',
        cargo: Cargo.ADMIN,
        gestor: null,
        trabajadoresACargos: [],
        rangosHorariosTrabajador: []
      },
      trabajadoresACargos: [],
      rangosHorariosTrabajador: []
    },
    {
      idTrabajador: 3,
      nombre: 'Alice',
      apellido: 'Johnson',
      dni: '54321678C',
      email: 'alicejohnson@example.com',
      password: 'password3',
      telefono: '543216789',
      cargo: Cargo.OPERARIO,
      gestor: {
        idTrabajador: 1,
        nombre: 'John',
        apellido: 'Doe',
        dni: '12345678A',
        email: 'johndoe@example.com',
        password: 'password1',
        telefono: '123456789',
        cargo: Cargo.ADMIN,
        gestor: null,
        trabajadoresACargos: [],
        rangosHorariosTrabajador: []
      },
      trabajadoresACargos: [],
      rangosHorariosTrabajador: []
    }
  ];

}
