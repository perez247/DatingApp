import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  jwtHelper = new JwtHelperService();

  constructor() { }

  valid() {
    const token: string = localStorage.getItem('token');

    if (!token) { return false; }

    const decodedToken = this.decodeToken(token);

    if (!decodedToken) { return false; }
  }

  decodeToken(inputToken?) {
    const token: string = inputToken || localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }

}
