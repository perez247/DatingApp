import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  jwtHelper = new JwtHelperService();

  constructor(private route: Router) { }

  valid() {
    const token: string = localStorage.getItem('token');

    if (!token) { return false; }

    const decodedToken = this.decodeToken(token);

    if (!decodedToken) { return false; }

    return true;
  }

  decodeToken(inputToken?) {
    const token: string = inputToken || localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }

  getDecodedToken() {
    if (!this.valid()) {
      this.route.navigate(['/home']);
      return {};
    }

    return this.decodeToken();
  }

  setData(data) {
    localStorage.setItem('token', data.token);
  }

  remove() {
    localStorage.removeItem('token');
  }

}
