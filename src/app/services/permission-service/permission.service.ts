import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  getPermissions(): Observable<any>{   
   return this.http.get<any>(`${this.apiUrl}/permissions`);
  }
  
  getPermission(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/permissions/${id}`);
  }

  createPermission(permission:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/permissions`, permission);
  }

  /*
  editRole(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}/edit`);
  }*/

  updatePermission(id: number, permission:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/permissions/${id}`, permission);
  }

  deletePermission(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/permissions/${id}`);
  }
  
}
