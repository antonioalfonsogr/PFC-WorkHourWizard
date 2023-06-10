import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Trabajador } from '../../models/trabajador.model';
import { RangoHorario } from '../../models/rangohorario.model';

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

  constructor(private apiService: ApiService, private authService: AuthService) { }

  async ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      selectable: false,
      select: this.handleDateSelect,
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
      editable: false,
      height: '31.05rem',
      allDaySlot: false
    };

    const email = this.authService.getEmail();
    if (email) {
      try {
        this.trabajador = await this.apiService.getTrabajadorByEmail(email).toPromise()!;

        if (this.trabajador && this.trabajador.cargo === 'GESTOR') {
          this.isGestor = true;

          const trabajadoresACargo = this.trabajador.trabajadoresACargo;
          if (trabajadoresACargo) {
            for (const trabajadorACargo of trabajadoresACargo) {
              const rangosHorarios = trabajadorACargo.rangosHorariosTrabajador!;
              if (rangosHorarios) {
                const eventosGuardados = rangosHorarios.map(rangoHorario => {
                  const backgroundColor = rangoHorario.verificado ? '#576f72' : '#7d9d9c';
                  console.log('backgroundColor:', backgroundColor);
                  console.log('verificado:', rangoHorario.verificado);

                  return {
                    title: `${trabajadorACargo.nombre} ${trabajadorACargo.apellido}`,
                    start: rangoHorario.fechaHoraInicio,
                    end: rangoHorario.fechaHoraFin,
                    allDay: false,
                    backgroundColor,
                    extendedProps: {
                      trabajadorId: trabajadorACargo.idTrabajador,
                      verificado: rangoHorario.verificado
                    },
                  };
                });

                this.calendarEvents = [...this.calendarEvents, ...eventosGuardados];
                console.log('calendarEvents:', this.calendarEvents);
              }
            }
          }

          this.calendarOptions.events = this.calendarEvents;
          console.log('calendarOptions:', this.calendarOptions);
        }

      } catch (error) {
        console.error('Error', error);
      }
    }
  }

  handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  }

  handleEventClick = (clickInfo: any) => {
    const calendarApi = clickInfo.view.calendar;
    const event = clickInfo.event;
  
    if (!event.extendedProps['verificado']) {
      event.setProp('backgroundColor', '#e4dccf');
      event.setExtendedProp('verificado', true);
  
      this.verifyTemp.push(event);
  
      this.calendarEvents = [...this.calendarEvents];
  
      calendarApi.refetchEvents();
    } else {
      event.setProp('backgroundColor', '#7d9d9c');
      event.setExtendedProp('verificado', false);
  
      const index = this.verifyTemp.findIndex(ev => ev.id === event.id);
      if (index !== -1) {
        this.verifyTemp.splice(index, 1);
      }
    }
  }

  verifyEvents() {
    if (window.confirm('¿Está seguro de verificar los eventos seleccionados?')) {
      const verifiedEvents = this.verifyTemp.map(event => ({
        ...event,
        backgroundColor: '#576f72',
        extendedProps: {
          ...event.extendedProps,
          verificado: true
        }
      }));

      this.calendarEvents = [...this.calendarEvents, ...verifiedEvents];

      this.verifyTemp = [];

      this.calendarOptions.events = this.calendarEvents;
    }
  }

  clearEvents() {
    if (this.calendarComponent?.getApi()) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.getEvents().forEach((event) => {
        if (event.extendedProps['verificado']) {
          event.setProp('backgroundColor', '#7d9d9c');
          event.setExtendedProp('verificado', false);

          const index = this.verifyTemp.findIndex(ev => ev.id === event.id);
          if (index !== -1) {
            this.verifyTemp.splice(index, 1);
          }
        }
      });
    }
  }
}
