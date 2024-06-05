import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './auth/auth.guard';
import { authGuard } from './auth/auth.guard';

//guarda isso aqui para depois. Esse é o comonente que será protegido na parte de 'routes'.
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { RoleComponent } from './role/role.component';
//import { UserComponent } from './user/user/user.component';

/*
const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/login/login.component').then(l => l.LoginComponent)},
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component:LogoutComponent },
  { path: 'roles', component:RoleComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'roles', /*component: RolesComponent, canActivate: [authGuard]*/ // },
//];

/*
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})*/

//export class AppRoutingModule { }
