import {
    HttpHandler,
    HttpHeaders, HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';
import {authFeature} from './store/auth.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select(authFeature.selectSession).pipe(
            take(1),
            exhaustMap(session => {
                if (session == null || session.trim().length == 0) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    headers: new HttpHeaders().set('session', session)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
