import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  jwtHelper = new JwtHelperService();
  authUser: any = {};
  baseUrl = environment.baseApiUrl + 'auth/';

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  ngOnInit() {
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(map((response: any) => {
        const res = response;
        if (res) {
          this.tokenService.setData(res);
          this.decodeToken();
        }
    }));
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    return this.tokenService.valid();
  }

  logout() {
    this.tokenService.remove();
  }

  decodeToken() {
    this.authUser = this.tokenService.getDecodedToken();
  }

}
