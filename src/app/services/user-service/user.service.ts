import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RoleService } from '../role-service/role.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:8000/api';
    
  constructor(private http: HttpClient, private router: Router, roleService: RoleService) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  getUserRoles(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users/${id}/edit`); 
  }
  
  /*
  createUser(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }*/

  updateUser(id: number, user:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  }


}
