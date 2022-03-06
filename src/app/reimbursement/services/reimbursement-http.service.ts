import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { User } from 'src/app/user/user.model';
import { Reimbursement } from '../reimbursement.model';

@Injectable({
  providedIn: 'root'
})

export class ReimbursementHttpService {

  connectedUser: User = {
    userId:0,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: ""
  };

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.connectedUser = authService.retrieveUser();

  }
  addNewReimbursementRequest(reimbursement: Reimbursement): Observable<Reimbursement> {
    reimbursement.author = this.connectedUser.userId;
    reimbursement.status = "PENDING";
    return this.http.post<Reimbursement>("http://localhost:4040/api/addNewReimbursement",JSON.stringify(reimbursement));
  }
  fetchAllReimbursements(): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>("http://localhost:4040/api/getAllReimbursments");
  }
  resolveReimbursement(reimbursement: Reimbursement): Observable<Reimbursement[]>{
    reimbursement.resolver = this.connectedUser.userId;
    return this.http.post<Reimbursement[]>("http://localhost:4040/api/resolveReimbursment",JSON.stringify(reimbursement));
  }
  fetchAllReimbursementsByStatus(status: string): Observable<Reimbursement[]>{
    return this.http.get<Reimbursement[]>("http://localhost:4040/api/getAllReimbursments/"+status);
  }

  fetchAllReimbursementsOfUser(userId: number): Observable<Reimbursement[]>{
    return this.http.get<Reimbursement[]>("http://localhost:4040/api/getEmployeeReimbursement/"+userId);
  }

  fetchAllReimbursementsOfUserByStatus(userId:number, status:string): Observable<Reimbursement[]>{
    return this.http.get<Reimbursement[]>("http://localhost:4040/api/getOwnReimbursementByStatus/"+userId+"/"+status);
  }
}
