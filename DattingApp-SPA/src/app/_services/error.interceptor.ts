import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

 @Injectable()

 export class ErrorInterceptor implements HttpInterceptor {
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //  next.handle(req).subscribe(x => console.log(x));
         return next.handle(req).pipe(
             catchError((error) => {
                 if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        return throwError(error.statusText);
                    }

                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                         return throwError(applicationError);
                    }

                    const serverError = error.error;
                    let modelStateEror = '';
                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modelStateEror += serverError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateEror || serverError || 'Server Error');
                 }
             } )
         );
     }
 }


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
