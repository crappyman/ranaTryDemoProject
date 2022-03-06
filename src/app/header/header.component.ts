import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/services/auth.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean{
    return this.authService.loggedIn;
  }

  getRole(): string{
    let data: User = this.authService.retrieveUser();
    return data.role;
  }
  logout() {
    this.authService.destroyUser();
    this.router.navigate(['login']);
  }
}
