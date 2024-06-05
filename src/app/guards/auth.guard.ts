
import { inject } from '@angular/core';
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';


export function CanActivateAuthGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);
 
  console.log('token de auth :', authService.getToken());
  if (authService.getToken() != null) {
    console.log("entrei no guard e tô logada");
    return true;
  } else {
    console.log("proibido entrar nessa rota");
    router.navigate(['/login']); // Use inject(Router) to get the Router service
    return false;
  }
}

