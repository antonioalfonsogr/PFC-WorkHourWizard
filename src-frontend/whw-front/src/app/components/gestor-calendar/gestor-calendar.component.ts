import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gestor-calendar',
  templateUrl: './gestor-calendar.component.html',
  styleUrls: ['./gestor-calendar.component.scss']
})
export class GestorCalendarComponent implements OnInit {

  @ViewChild('calendar', { static: false }) calendarComponent?: FullCalendarComponent;

  calendarEvents: EventInput[] = [];

  calendarOptions: any;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
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
      allDaySlot: false
    };
  }

  handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();


  }
}
