import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private username!: string;
  private userJWTToken: string = '';

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
  getJWTToken() {
    return this.userJWTToken
  }

  setJWTToken(token:string){
    this.userJWTToken=token
  }

}
