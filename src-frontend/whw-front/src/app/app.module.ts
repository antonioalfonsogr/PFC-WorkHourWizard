import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FullCalendarModule } from '@fullcalendar/angular';

import { AppRoutingModule } from './app-routing.module';

import { AdminComponent } from './components/admin/admin.component';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EditWorkerComponent } from './components/edit-worker/edit-worker.component';
import { FooterComponent } from './components/footer/footer.component';
import { GestorCalendarComponent } from './components/gestor-calendar/gestor-calendar.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

import { AuthInterceptor } from './helpers/auth.interceptor';


@NgModule({
  declarations: [
    AdminComponent,
    AppComponent,
    CalendarComponent,
    EditWorkerComponent,
    FooterComponent,
    GestorCalendarComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FullCalendarModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

