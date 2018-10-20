import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

constructor(private http: HttpClient) {
  super();
}

private get route() {
  return this.baseUrl + 'api/auth/';
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
  return !!token;
}

logout() {
  localStorage.removeItem('token');
  console.log('logged out');
}

}
