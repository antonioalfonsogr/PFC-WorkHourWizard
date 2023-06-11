import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { RangoHorario } from '../../models/rangohorario.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar', { static: false }) calendarComponent?: FullCalendarComponent;

  calendarEvents: EventInput[] = [];
  calendarOptions: any;
  tempEvents: EventInput[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) { }

  async ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      selectable: true,
      select: this.handleDateSelect,
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
      allDaySlot: false,
      timeZone: 'local'
    };

    const email = this.authService.getEmail();
    if (email) {
      try {
        const trabajador = await this.apiService.getTrabajadorByEmail(email).toPromise();
        console.log('trabajador:', trabajador);

        if (trabajador) {
          const rangosHorarios = await this.apiService.obtenerRangosHorarios(trabajador.idTrabajador).toPromise();
          if (rangosHorarios) {
            this.calendarEvents = rangosHorarios.map(rangoHorario => ({
              start: rangoHorario.fechaHoraInicio,
              end: rangoHorario.fechaHoraFin,
              allDay: false,
              backgroundColor: rangoHorario.verificado ? '#576f72' : '#7d9d9c',
              title: rangoHorario.verificado ? `${trabajador.nombre} ${trabajador.apellido} --Verificado--` : `${trabajador.nombre} ${trabajador.apellido}`
            }));
            this.calendarOptions.events = this.calendarEvents;
          }
        }
      } catch (error) {
        console.error('Error al cargar los rangos horarios:', error);
      }
    }
  }

  handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    const newEvent = {
      start: selectInfo.start.toISOString(),
      end: selectInfo.end.toISOString(),
      allDay: selectInfo.allDay,
      backgroundColor: '#e4dccf',
    };

    this.tempEvents.push(newEvent);
    calendarApi.addEvent(newEvent);
  }

  saveEvents() {
    if (window.confirm('Está a punto de guardar su horario y ya no podrá ser modificado, ¿Desea continuar?')) {
      const savedEvents = this.tempEvents.map(event => ({ ...event, backgroundColor: '#7d9d9c' }));

      this.calendarEvents = [...this.calendarEvents, ...savedEvents];
      this.tempEvents = [];
      this.calendarOptions.events = this.calendarEvents;

      const email = this.authService.getEmail();
      if (email) {
        this.handleSaveEventRequests(email, savedEvents);
      }
    }
  }

  async handleSaveEventRequests(email: string, savedEvents: EventInput[]) {
    try {
      const trabajador = await this.apiService.getTrabajadorByEmail(email).toPromise();
      if (trabajador) {
        await Promise.all(savedEvents.map(event => {
          const rangoHorario: RangoHorario = {
            fechaHoraInicio: event.start as string,
            fechaHoraFin: event.end as string,
            verificado: false
          };
          return this.apiService.insertarRangoHorario(trabajador.idTrabajador, rangoHorario).toPromise();
        }));
        console.log('Eventos guardados exitosamente');
      } else {
        console.error('No se encontró el trabajador con el correo electrónico:', email);
      }
    } catch (error) {
      console.error('Error al guardar eventos:', error);
    }
  }

  onSubmit() {
    this.saveEvents();
  }

  clearEvents() {
    if (this.calendarComponent?.getApi()) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.getEvents().forEach(event => {
        if (event.backgroundColor === '#e4dccf') {
          event.remove();
        }
      });
      this.tempEvents = [];
    }
  }
}
