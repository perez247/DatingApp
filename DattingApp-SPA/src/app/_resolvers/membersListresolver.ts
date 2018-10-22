import { catchError } from 'rxjs/operators';
import { ToasterService } from 'src/app/_services/toaster.service';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import {User} from '../_models/user';
import { Observable, of } from 'rxjs';

@Injectable()

export class MemberListResolver implements Resolve<User> {

    constructor(
        private userService: UserService,
        private router: Router,
        private toaster: ToasterService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.toaster.error(error);
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }
}
