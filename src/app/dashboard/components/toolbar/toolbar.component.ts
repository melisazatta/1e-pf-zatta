import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output()
  toggleSidebar = new EventEmitter();

  constructor(private authService: AuthService, private router: Router){}

  navigateToHome() {
    this.router.navigate(['dashboard','home']);
  }

  logout(): void {
    this.authService.logout();
  }

}
