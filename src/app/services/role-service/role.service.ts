import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  getRoles(): Observable<any>{   
   return this.http.get<any>(`${this.apiUrl}/roles`);
  }

  getRoleListOptions(): Observable<any>{
   return this.http.get<any>(`${this.apiUrl}/getRoles`);
  }

  getRole(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/roles/${id}`);
  }

  createRole(role:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/roles`, role);
  }

  /*
  editRole(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}/edit`);
  }*/

  updateRole(id: number, role:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/roles/${id}`, role);
  }

  deleteRole(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/roles/${id}`);
  }

  getRolePermissions(id: number) {
    return this.http.get<any>(`${this.apiUrl}/roles/${id}/add-permissions`);
  }

  /*
  givePermissions(id: number) {
    this.router.navigate([`${this.apiUrl}/${id}/give-permissions`]);
  }*/

  givePermissionsToRole(id: number, permissions:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/roles/${id}/give-permissions`, { permissions });
  }
}
