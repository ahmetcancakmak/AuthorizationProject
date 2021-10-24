import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  apiUrl = environment.apiUrl;

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`)
  }

  createUser(user): Observable<User>{
    return this.http.post<User>("${this.apiUrl}/users/add", user)
  }

  removeUser(id): Observable<User>{
    return this.http.post<User>("${this.apiUrl}/users/remove", id)
  }
  editUser(id): Observable<User>{
    return this.http.post<User>("${this.apiUrl}/users/edit", id)
  }
}
