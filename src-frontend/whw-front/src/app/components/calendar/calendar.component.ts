import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarEvents: any[] = [];

  calendarOptions: any;

  constructor() { }

  ngOnInit() {

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      selectable: true,
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
      height: '26.5rem'
    };

    this.calendarEvents = [
      {
        title: "Event 1",
        date: new Date(),
        end: new Date(new Date().getTime() + 8640000)
      },
      {
        title: "Event 2",
        date: new Date(new Date().getTime() + 86400000),
        end: new Date(new Date().getTime() + 86410000)
      },      
      {
        title: "Event 3",
        date: new Date(new Date().getTime() + 86400000 * 2),
        end: new Date(new Date().getTime() + 86400000 * 3)
      }
    ];
  }

}




