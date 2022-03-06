import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReimbursementComponent } from './reimbursement/add-reimbursement/add-reimbursement.component';
import { ReimbursementListComponent } from './reimbursement/reimbursement-list/reimbursement-list.component';
import { AuthGuard } from './user/auth.guard';
import { EmployeeListComponent } from './user/employee-list/employee-list.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [

  { path: "login", component: LoginComponent },
  { path: "reimbursementList", component: ReimbursementListComponent, canActivate: [AuthGuard] },
  { path: "employeesList", component: EmployeeListComponent, canActivate: [AuthGuard]},
  { path: "view-request/:userId", component: ReimbursementListComponent, canActivate: [AuthGuard] },
  { path: "add-reimbursement", component: AddReimbursementComponent, canActivate: [AuthGuard] },
  { path: "manage-profile", component: ProfileComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
