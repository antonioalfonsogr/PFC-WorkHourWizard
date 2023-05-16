import { Component, OnInit } from '@angular/core';
import { DdrConfigurationService } from 'ddr-configuration';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public show: boolean;
  public data: any;

  constructor(private config: DdrConfigurationService) { 
    const infoJSON = this.config.getAllData();
    this.show = infoJSON.available;
    this.data = infoJSON.availability; 
  }

  ngOnInit() {
  }

}
