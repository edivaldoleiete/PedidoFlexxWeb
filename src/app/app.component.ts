import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  currentUser: User;
  toggled = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
