import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reimbursement } from '../reimbursement.model';
import { ReimbursementHttpService } from '../services/reimbursement-http.service';

@Component({
  selector: 'app-add-reimbursement',
  templateUrl: './add-reimbursement.component.html',
  styleUrls: ['./add-reimbursement.component.css']
})
export class AddReimbursementComponent implements OnInit {
  errorMessage: string = "";
  error: boolean = false;
  reimbursementTypes: string [] = ['Lodging','Travel','Food','Other'];
  newReimbursement: Reimbursement = {
      reimbId: 0,
      amount: 0,
      dateSubmitted: "",
      dateResolved: "",
      description: "",
      author: 0,
      resolver: 0,
      status: "",
      type: ""
  };
  constructor(private reimbursementHttp: ReimbursementHttpService, private router: Router) { }

  ngOnInit(): void {
  }
  addReimbursement() {
    if( this.newReimbursement.type.length == 0  ){
      this.errorMessage = "Please select a type";
      this.error = true;
    }
    else if( this.newReimbursement.description.length == 0 ){
      this.errorMessage = "Please fill a description";
      this.error = true;
    }   
    else {
      this.error = false;
      this.reimbursementHttp.addNewReimbursementRequest(this.newReimbursement).subscribe((response)=>{
        if( response ){
          this.router.navigate(['reimbursementList']);
        }
        else {
          this.errorMessage = "Failed Adding Reimbursement";
          this.error = true;
        }
      });
    }

  }

}
