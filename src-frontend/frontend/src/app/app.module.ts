import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DdrConfigurationService } from 'ddr-configuration';

export function configFactory(provider: DdrConfigurationService){
  return () => provider.getDataFromJSON('asserts/data/data.json');
}

@NgModule({
  declarations: [		
    AppComponent,
      CalendarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DdrConfigurationService,{
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [DdrConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
