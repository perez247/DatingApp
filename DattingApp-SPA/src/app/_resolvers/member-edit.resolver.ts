import { catchError } from 'rxjs/operators';
import { ToasterService } from 'src/app/_services/toaster.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import {User} from '../_models/user';
import { Observable, of } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()

export class MemberEditResolver implements Resolve<User> {

    constructor(
        private userService: UserService,
        private router: Router,
        private toaster: ToasterService,
        private authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        // return of(null);
        // console.log(this.authService.authUser);
        return this.userService.getUser(this.authService.authUser.nameid).pipe(
            catchError(error => {
                this.toaster.error(error);
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
