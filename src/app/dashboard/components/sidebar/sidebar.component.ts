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

  get name$(): Observable<string | undefined> {
    return this.authUser$.pipe(map((user) => user?.name));
  }

  get email$(): Observable<string | undefined> {
    return this.authUser$.pipe(map((user) => user?.email));
  }


  // logout(): void {
  //   this.authService.logout();
  // }

}
