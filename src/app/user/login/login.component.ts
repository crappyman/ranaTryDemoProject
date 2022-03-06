import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserHttpService } from '../services/user-http.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    
  username: string = "";
  password: string = "";
  errorMessage: string = ""; 
  newUser : User = {
    userId: 0,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  }
  constructor(private userService: UserHttpService, private router: Router, private authService: AuthService) { }



  ngOnInit(): void {
  }

  validateUser() {
     this.userService.login(this.username, this.password).subscribe((response)=>{
      this.newUser = response;
      if (this.newUser.username !="" ){
       this.authService.storeUser(this.newUser);
       this.authService.loggedIn = true;
       this.router.navigate(['reimbursementList']);
      }
      else {
        this.errorMessage = "Invalid Credentials!!";
      }
   });
      
  }

}
