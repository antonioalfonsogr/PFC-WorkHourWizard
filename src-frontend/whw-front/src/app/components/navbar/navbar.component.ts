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
  isAuthenticated: boolean = false;
  private authSub!: Subscription;

  /**
   * Constructor del componente Navbar.
   * 
   * @param router 
   * @param authService 
   */
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  /**
   * Subcripción al observable de autenticación del servicio AuthService.
   * 
   */
  ngOnInit(): void {
    this.authSub = this.authService.authStatus$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  /**
   * Para realizar limpieza y evitar memory leaks. 
   * 
   */
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  /**
   * Método que navega a diferentes rutas según el rol del usuario.
   * 
   */
  navigateBasedOnRole(): void {
    const userCargo = this.authService.getCargo();
    switch (userCargo) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'GESTOR':
        this.router.navigate(['/gestor-calendar']);
        break;
      case 'OPERARIO':
      case 'SUPERVISOR':
        this.router.navigate(['/calendar']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  /**
   * Método para navegar a la página de información del trabajador.
   * 
   */
  infoTrabajador(): void {
    this.router.navigate(['/info-trabajador']);
  }

  /**
   * Método para cerrar la sesión del usuario.
   * 
   */
  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
