import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
