import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EditWorkerComponent } from './components/edit-worker/edit-worker.component';
import { GestorCalendarComponent } from './components/gestor-calendar/gestor-calendar.component';  

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'edit-worker', component: EditWorkerComponent },
  { path: 'gestor-calendar', component: GestorCalendarComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
