import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-topbar-menu',
  templateUrl: './topbar-menu.component.html',
  styleUrls: ['./topbar-menu.component.css']
})
export class TopbarMenuComponent implements OnInit {

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
