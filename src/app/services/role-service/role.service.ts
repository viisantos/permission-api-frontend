import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getRoles(): Observable<any>{
    /*const token = this.authService.getToken();
    console.log("token - tô na tela de role", token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
   return this.http.get<any>(this.apiUrl, { headers });*/
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

  editRole(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}/edit`);
  }

  updateRole(id: number, role:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/roles/${id}`, role);
  }

  deleteRole(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/roles/${id}`);
  }

  givePermissions(id: number) {
    this.router.navigate([`${this.apiUrl}/${id}/give-permissions`]);
  }

  givePermissionsToRole(id: number, permissions:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}/give-permissions`, { permissions });
  }
}
