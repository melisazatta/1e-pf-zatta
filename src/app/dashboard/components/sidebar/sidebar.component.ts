import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../pages/users/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public authUser$: Observable<User | null>;

  constructor(private authService: AuthService){  
    
    this.authUser$ = this.authService.authUser$
  }

  get fullName$(): Observable<string> {
    return this.authUser$.pipe(
      map((user) => `${user?.name} ${user?.lastName}`)
    );
    }
  get email$(): Observable<string | undefined> {
    return this.authUser$.pipe(map((user) => user?.email));
  }


  navigationItems = [
    { label: 'Home', link: 'home', icon: 'home' },
    { label: 'Usuarios', link: 'users', icon: 'perm_identity' },
    { label: 'Alumnos', link: 'students', icon: 'school' },
    { label: 'Cursos', link: 'courses', icon: 'menu_book' },
    { label: 'Inscripciones', link: 'enrollments', icon: 'library_add' }
  ];


  // logout(): void {
  //   this.authService.logout();
  // }

}
