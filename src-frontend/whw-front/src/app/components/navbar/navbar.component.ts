import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuarioAutenticado : boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.usuarioAutenticado = this.apiService.isAuthenticated();
  }

  infoTrabajador() {
    this.router.navigate(['/info-trabajador']);
  }

  logOut() {
    this.router.navigate(['/login']);
  }

}


