import { Trabajador } from './trabajador.model';

export interface RangoHorario {
    idRangoHorario?: number;
    fechaHoraInicio: string; 
    fechaHoraFin: string; 
    verificado?: boolean; 
    trabajador?: Trabajador; 
  }
  