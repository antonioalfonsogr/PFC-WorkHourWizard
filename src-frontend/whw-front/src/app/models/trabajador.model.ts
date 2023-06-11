import { Cargo } from './cargo.model';
import { RangoHorario } from './rangohorario.model';

export interface Trabajador {
  idTrabajador: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  password: string;
  telefono: string;
  cargo: Cargo;
  gestor: Trabajador | null;
  trabajadoresACargo: Trabajador[];
  rangosHorariosTrabajador: RangoHorario[];
}


export interface Credentials {
  email: string;
  password: string;
}