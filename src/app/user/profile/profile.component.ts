import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserHttpService } from '../services/user-http.service';
import { User } from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: User ={
    userId:0,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  }
  oldPassword: string ="";
  newPassword: string ="";
  errorMessage: string ="";
  error: boolean = false;
  constructor(private authService: AuthService, private userService: UserHttpService, private router:Router) { }

  ngOnInit(): void {
    this.userInfo = this.authService.retrieveUser();
  }

  updateProfile(){

      if( this.userInfo.firstName.length == 0 ){
        this.errorMessage = "Select the first name.";
        this.error = true;
      } 
      else if(this.userInfo.lastName.length == 0){
        this.errorMessage = "Select the last name.";
        this.error = true;
      }
      else if(this.userInfo.email.length == 0){
        this.errorMessage = "Select the email.";
        this.error = true;
      }
      else {
        this.error = false;
      }
     if(this.newPassword.length > 0){
        if(this.oldPassword == this.userInfo.password){
          this.userInfo.password = this.newPassword;
          this.error = false;
        }
        else {
          this.errorMessage = "Old password incorect ";
          this.error = true;
        }
      }
      if(!this.error) {
       this.userService.updateUser(this.userInfo).subscribe((response)=>{
         if(response){
           this.authService.storeUser(this.userInfo);
           this.router.navigate(['reimbursementList']);
         }
       })
      }

  }
}
