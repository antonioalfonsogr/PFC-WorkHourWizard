import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isAuthenticated : boolean = false;
  private authSub!: Subscription;  

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authSub = this.authService.authStatus$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  infoTrabajador() {
    this.router.navigate(['/info-trabajador']);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}






