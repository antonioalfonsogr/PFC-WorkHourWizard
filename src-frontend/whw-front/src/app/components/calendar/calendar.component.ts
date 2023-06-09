import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

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

  constructor() { }

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
      start: selectInfo.startStr,
      end: selectInfo.endStr,
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
    }
  }
  

  clearEvents() {
    if(this.calendarComponent?.getApi()) {
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








