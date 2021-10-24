import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Role} from "../models/role";
import {delay, dematerialize, materialize, mergeMap} from "rxjs/operators";
import {User} from "../models/user";

@Injectable()
export class DataInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: User[] = [
      { id: 1, username: 'admin', password: 'admin', role: Role.Admin },
      { id: 2, username: 'user', password: 'user', role: Role.User },
      { id: 3, username: 'superAdmin', password: 'superAdmin', role: Role.SuperAdmin },
      { id: 4, username: 'user4', password: 'user', role: Role.User },
      { id: 5, username: 'user5', password: 'user', role: Role.User },
      { id: 6, username: 'user6', password: 'user', role: Role.User },
      { id: 7, username: 'user7', password: 'user', role: Role.User },
      { id: 8, username: 'user8', password: 'user', role: Role.User },
      { id: 9, username: 'user9', password: 'user', role: Role.User },
      { id: 10, username: 'user10', password: 'user', role: Role.User },
      { id: 11, username: 'admin2', password: 'admin', role: Role.Admin },
      { id: 12, username: 'admin3', password: 'admin', role: Role.Admin },
      { id: 13, username: 'admin4', password: 'admin', role: Role.Admin },
    ];

    const authHeader = request.headers.get('Authorization');
    const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
    const roleString = isLoggedIn && authHeader!.split('.')[1];
    const role = roleString ? Role[roleString] : null;

    return of(null).pipe(mergeMap(() => {

      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
        if (!user) return error('Username or password is incorrect');
        return ok({
          id: user.id,
          username: user.username,
          role: user.role,
          token: `fake-jwt-token.${user.role}`
        });
      }

      if (request.url.endsWith('/users/add') && request.method === 'POST') {
        const user = null;
        console.log("User Added");
        return ok(user);
      }

      if (request.url.endsWith('/users/remove') && request.method === 'POST') {
        const user = null;
        console.log("User Deleted");
        return ok(user);
      }

      if (request.url.endsWith('/users/edit') && request.method === 'POST') {
        const user = null;
        console.log("User Edited");
        return ok(user);
      }

      if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
        if (!isLoggedIn) return unauthorised();

        let urlParts = request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);

        const currentUser = users.find(x => x.role === role);
        if (id !== currentUser!.id && role !== Role.Admin && role !== Role.SuperAdmin) return unauthorised();

        const user = users.find(x => x.id === id);
        return ok(user);
      }

      if (request.url.endsWith('/users') && request.method === 'GET') {
        if (role !== Role.Admin && role !== Role.SuperAdmin) return unauthorised();
        return ok(users);
      }

      return next.handle(request);
    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function ok(body) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorised() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message) {
      return throwError({ status: 400, error: { message } });
    }
  }

}

export let dataProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DataInterceptor,
  multi: true
};
