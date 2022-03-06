import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserHttpService } from '../services/user-http.service';
import { User } from '../user.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  allEmployees: User [] =[];
  constructor(private userService: UserHttpService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEmployee();

  }

  getAllEmployee(){
    this.userService.getAllEmployee().subscribe((response)=> {
      console.log(response)
      this.allEmployees = response;
    });
  }

  viewRequests(id: number){
    this.router.navigate(['view-request', id]);
  }
}
