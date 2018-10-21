import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService implements OnInit {
  jwtHelper = new JwtHelperService();
  authUser: any = {};

constructor(private http: HttpClient) {
  super();
}

private get route() {
  return this.baseUrl + 'api/auth/';
}

ngOnInit() {
}

login(model: any) {
  return this.http.post(this.route + 'login', model).pipe(map((response: any) => {
      const res = response;
      if (res) {
        localStorage.setItem('token', res.token);
      }
  }));
}

register(model: any) {
  return this.http.post(this.route + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

logout() {
  localStorage.removeItem('token');
}

decodeToken() {
  const token = localStorage.getItem('token');
  this.authUser = this.jwtHelper.decodeToken(token);
}

}
