import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
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

  @ViewChild('calendar', {static: false}) calendarComponent?: FullCalendarComponent;

  calendarEvents: EventInput[] = [];

  calendarOptions: any;

  tempEvents: EventInput[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      selectable: true,
      select: this.handleDateSelect.bind(this),
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
      slotMaxTime: '21:00:00',
      editable: false,
      height: '31.05rem',
      allDaySlot: false 
    };
  }

  handleDateSelect(selectInfo: any) {
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
      const savedEvents = this.tempEvents.map(event => ({ ...event, backgroundColor: '#576f72' }));

      this.calendarEvents = [...this.calendarEvents, ...savedEvents];

      this.tempEvents = [];

      this.calendarOptions.events = this.calendarEvents;

      const email = this.authService.getEmail();
      if (email) {
        this.apiService.getTrabajadorByEmail(email).subscribe(
          (trabajador) => {
            const idTrabajador = trabajador.idTrabajador;

            const apiCalls = savedEvents.map(event => {
              const rangoHorario: RangoHorario = {
                fechaHoraInicio: event.start as string,
                fechaHoraFin: event.end as string,
                verificado: false
              };

              console.log('URL de la solicitud:', `/api/trabajador/${idTrabajador}/rangohorario`);
              console.log('JSON que se envía:', rangoHorario);

              return this.apiService.insertarRangoHorario(idTrabajador, rangoHorario);
            });

            if (apiCalls.length > 0) {
              Promise.all(apiCalls).then(() => {
                console.log('Eventos guardados exitosamente');
              }).catch(error => {
                console.error('Error al guardar eventos:', error);
              });
            }
          },
          (error) => {
            console.error('Error al obtener el trabajador:', error);
          }
        );
      }
    }
  }


  clearEvents() {
    if (this.calendarComponent?.getApi()) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.getEvents().forEach((event) => {
        if (event.backgroundColor === '#e4dccf') {
          event.remove();
        }
      });
      this.tempEvents = [];
    }
  }

}










