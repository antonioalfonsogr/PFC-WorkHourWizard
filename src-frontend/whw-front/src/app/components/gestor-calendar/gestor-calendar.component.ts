import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Trabajador } from '../../models/trabajador.model';
import { RangoHorario } from '../../models/rangohorario.model';
import * as moment from 'moment';

@Component({
  selector: 'app-gestor-calendar',
  templateUrl: './gestor-calendar.component.html',
  styleUrls: ['./gestor-calendar.component.scss']
})
export class GestorCalendarComponent implements OnInit {
  @ViewChild('calendar', { static: false }) calendarComponent?: FullCalendarComponent;

  calendarEvents: EventInput[] = [];
  verifyTemp: EventInput[] = [];
  calendarOptions: any;

  trabajador: Trabajador | undefined | null;
  isGestor: boolean = false;

  /**
   * Constructor del componente GestorCalendarComponent.
   * 
   * @param {ApiService} apiService 
   * @param {AuthService} authService 
   */
  constructor(private apiService: ApiService, private authService: AuthService) { }

  /**
   * Configura el calendario y recupera los datos del trabajador actual y sus eventos.
   * 
   */
  async ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      selectable: false,
      editable: false,
      eventClick: this.handleEventClick,
      events: this.calendarEvents,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay'
      },
      locale: esLocale,
      slotDuration: '01:00:00',
      slotLabelInterval: '01:00:00',
      slotMinTime: '07:00:00',
      slotMaxTime: '23:00:00',
      height: '31.05rem',
      allDaySlot: false,
      timeZone: 'local'
    };

    const email = this.authService.getEmail();
    if (email) {
      try {
        this.trabajador = await this.apiService.getTrabajadorByEmail(email).toPromise();

        // Si el trabajador es un gestor, se recuperan los eventos de los trabajadores a su cargo
        if (this.trabajador && this.trabajador.cargo === 'GESTOR') {
          this.isGestor = true;

          const trabajadoresACargo = this.trabajador.trabajadoresACargo;
          if (trabajadoresACargo) {
            for (const trabajadorACargo of trabajadoresACargo) {
              const rangosHorarios = trabajadorACargo.rangosHorariosTrabajador!;
              if (rangosHorarios) {
                const eventosGuardados = rangosHorarios.map((rangoHorario) => ({
                  title: `${trabajadorACargo.nombre} ${trabajadorACargo.apellido}` + (rangoHorario.verificado ? ' -Verificado-' : ''),
                  start: moment.utc(rangoHorario.fechaHoraInicio).local().toDate(),
                  end: moment.utc(rangoHorario.fechaHoraFin).local().toDate(),
                  allDay: false,
                  backgroundColor: rangoHorario.verificado ? '#576f72' : '#7d9d9c',
                  extendedProps: {
                    trabajadorId: trabajadorACargo.idTrabajador,
                    verificado: rangoHorario.verificado,
                    idRangoHorario: rangoHorario.idRangoHorario
                  }
                }));

                this.calendarEvents = [...this.calendarEvents, ...eventosGuardados];
              }
            }
          }

          this.calendarOptions.events = this.calendarEvents;
        }
      } catch (error) {
        console.error('Error', error);
      }
    }
  }


  /**
   * Manejador del clic en un evento del calendario.
   * 
   * @param {any} clickInfo - Información del clic
   */
  handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    // Si el evento no está verificado, se cambia su color y se marca como verificado
    if (event.extendedProps && !event.extendedProps.verificado) {
      event.setProp('backgroundColor', '#e4dccf');
      event.setExtendedProp('verificado', true);
      this.verifyTemp.push(event);
      this.calendarComponent?.getApi()?.refetchEvents();
    }
  }


  /**
   * Verifica los eventos seleccionados.
   * Actualiza el estado de los eventos en el servidor.
   * 
   */
  verifyEvents() {
    if (window.confirm('¿Está seguro de verificar los eventos seleccionados?')) {
      const updatedRangosHorarios: RangoHorario[] = [];
      for (const event of this.verifyTemp) {
        if (event.extendedProps) {
          const trabajadorACargo = this.trabajador?.trabajadoresACargo.find(t => t.idTrabajador === event.extendedProps!['trabajadorId']);
          const rangoHorario: RangoHorario = {
            idRangoHorario: event.extendedProps!['idRangoHorario'] as number,
            fechaHoraInicio: moment.utc(event.start as Date).format(),
            fechaHoraFin: moment.utc(event.end as Date).format(),
            verificado: true,
            trabajador: trabajadorACargo || undefined
          };
          updatedRangosHorarios.push(rangoHorario);
        }
      }

      for (const rangoHorario of updatedRangosHorarios) {
        if (rangoHorario.trabajador && rangoHorario.idRangoHorario) {
          this.apiService.updateRangoHorario(rangoHorario.trabajador.idTrabajador, rangoHorario.idRangoHorario, rangoHorario).subscribe(
            () => {
              this.verifyTemp.forEach((event) => {
                if (event.extendedProps) {
                  event['setProp']('backgroundColor', '#576f72');
                  event['setExtendedProp']('verificado', true);
                }
              });
              this.verifyTemp = [];
              this.calendarComponent?.getApi()?.refetchEvents();
            },
            (error) => {
              console.error('Error al actualizar los rangos horarios:', error);
            }
          );
        }
      }
    }
  }


  /**
   * Limpia los eventos seleccionados.
   * Restablece el color de los eventos y los marca como no verificados.
   * 
   */
  clearEvents() {
    if (this.calendarComponent?.getApi()) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.getEvents().forEach((event) => {
        this.verifyTemp.forEach((tempEvent) => {
          if (event.id === tempEvent.id) {
            tempEvent['setProp']('backgroundColor', '#7d9d9c');
            tempEvent['setExtendedProp']('verificado', false);
          }
        });
      });
    }
    this.verifyTemp = [];
  }
}
