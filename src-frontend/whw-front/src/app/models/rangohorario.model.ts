import { Trabajador } from './trabajador.model';

export interface RangoHorario {
  idRangoHorario?: number;
  fechaHoraInicio: string | Date;
  fechaHoraFin: string | Date;
  verificado?: boolean;
  trabajador?: Trabajador;
}
