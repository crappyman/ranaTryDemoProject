import { Injectable } from '@angular/core';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  loggedIn: boolean = false;

  storeUser(user: User): void{
    sessionStorage.setItem("userInfo", JSON.stringify(user));
  }

  retrieveUser(): User{
    let data: any = sessionStorage.getItem("userInfo");
    return JSON.parse(data);
  }

  destroyUser(): void{
    sessionStorage.removeItem("userInfo");
    this.loggedIn = false;
  }
  
}
