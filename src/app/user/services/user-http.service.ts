import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User>{
    return this.http.post<any>("http://localhost:4040/api/login", JSON.stringify({username,password}));
  }

  getAllEmployee(){
    return this.http.get<any>("http://localhost:4040/api/getAllUsers");
  }
  updateUser(user:User){
    return this.http.put<boolean>("http://localhost:4040/api/updateInformation", JSON.stringify(user));
  }

}
