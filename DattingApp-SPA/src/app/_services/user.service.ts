import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseApiUrl + 'users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    // console.log(this.baseUrl);
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  updateUser(id, user: User) {
    return this.http.put(this.baseUrl + '/' + id, user);
  }

}
