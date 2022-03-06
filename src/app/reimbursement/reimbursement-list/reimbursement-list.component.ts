import { Component, OnInit } from '@angular/core';
import { Reimbursement } from '../reimbursement.model';
import { ReimbursementHttpService } from '../services/reimbursement-http.service';
import { User } from '../../user/user.model';
import { AuthService } from 'src/app/user/services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reimbursement-list',
  templateUrl: './reimbursement-list.component.html',
  styleUrls: ['./reimbursement-list.component.css']
})
export class ReimbursementListComponent implements OnInit {
  allReimbursements: Reimbursement[] = [];
  errorMessage: String ="";
  
  constructor(private reimbursementHttp: ReimbursementHttpService, private authService: AuthService, private activatedRoute: ActivatedRoute) { 

  }
  isLoggedIn(): boolean{
    return this.authService.loggedIn;
  }

  getRole(): string{
    let data: User = this.authService.retrieveUser();
    return data.role;
  }

  ngOnInit(): void {
    let userId: any = this.activatedRoute.snapshot.paramMap.get("userId");
    console.log(userId);
    if( userId != null && this.getRole() =="FINANCE_MANAGER" ){
      this.loadAllReimbursementsOfAnEmployee(userId);
    } 
    else if( userId != null && this.getRole() =="EMPLOYEE"){
  
      this.loadAllReimbursementsOfAnEmployee(this.authService.retrieveUser().userId);
    }
    else if( userId == null && this.getRole() =="EMPLOYEE"){
  
      this.loadAllReimbursementsOfAnEmployee(this.authService.retrieveUser().userId);
    }
    else if(userId == null && this.getRole() =="FINANCE_MANAGER")
    {
      this.loadAllReimbursements();
    }
    
  }

  loadAllReimbursements(){
    if(this.getRole() =="FINANCE_MANAGER")
    this.reimbursementHttp.fetchAllReimbursements().subscribe( response => {
      this.allReimbursements = response;
    });
    else 
      this.loadAllReimbursementsOfAnEmployee(this.authService.retrieveUser().userId);
  }

  loadAllReimbursementsOfAnEmployee(userId: number){
    this.reimbursementHttp.fetchAllReimbursementsOfUser(userId).subscribe( (response)=>{
      this.allReimbursements = response;
    });
  }
  approveReimbursement(reimbursement: Reimbursement){
    reimbursement.status = 'APPROVED';
    this.reimbursementHttp.resolveReimbursement(reimbursement).subscribe((response)=> {
      if(response){
        this.loadAllReimbursements();
      }
      else 
      this.errorMessage="Failed to update";
      
    });
}
  denyReimbursement(reimbursement: Reimbursement){
  reimbursement.status = 'DENIED';
  this.reimbursementHttp.resolveReimbursement(reimbursement).subscribe((response)=> {
    if(response){
      this.loadAllReimbursements();
    }
    else 
      this.errorMessage="Failed to update";
    
  });
}

getAllApprovedReimbursements(){
  let status: string ='APPROVED';
  if( this.getRole() == "FINANCE_MANAGER" ){
    this.reimbursementHttp.fetchAllReimbursementsByStatus(status).subscribe((response)=> {
      this.allReimbursements = response;});
  }
  else {
    let user : User = this.authService.retrieveUser();
    this.reimbursementHttp.fetchAllReimbursementsOfUserByStatus(user.userId,status).subscribe((response)=> {
    this.allReimbursements = response;});
   }

}
getAllDeniedReimbursements(){
  let status: string ='DENIED';
  if( this.getRole() == "FINANCE_MANAGER" ){
    this.reimbursementHttp.fetchAllReimbursementsByStatus(status).subscribe((response)=> {
    this.allReimbursements = response;}); 
  }
  else {
    let user : User = this.authService.retrieveUser();
    this.reimbursementHttp.fetchAllReimbursementsOfUserByStatus(user.userId,status).subscribe((response)=> {
    this.allReimbursements = response;});
        }
 }
 getAllPendingReimbursements(){
   let status: string = 'PENDING';
  if( this.getRole() == "FINANCE_MANAGER" ){
    this.reimbursementHttp.fetchAllReimbursementsByStatus(status).subscribe((response)=> {
    this.allReimbursements = response;});
  }
  else {
      let user : User = this.authService.retrieveUser();
      this.reimbursementHttp.fetchAllReimbursementsOfUserByStatus(user.userId,status).subscribe((response)=> {
      this.allReimbursements = response;});
  }
 }

}

