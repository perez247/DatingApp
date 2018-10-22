import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  jwtHelper = new JwtHelperService();
  authUser: any = {};
  baseUrl = environment.baseApiUrl + 'auth/';

constructor(private http: HttpClient) {
}

ngOnInit() {
}

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model).pipe(map((response: any) => {
      const res = response;
      if (res) {
        localStorage.setItem('token', res.token);
      }
  }));
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
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
